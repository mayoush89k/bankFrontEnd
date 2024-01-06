import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // const url = "https://bankapi-gswf.onrender.com";
  // const url = "https://easy-teal-sea-urchin-cap.cyclic.app"
  const url = "http://localhost:3000";
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : {}
  )
  const [users, setUsers] = useState({});
  const [error , setError] = useState('')

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  const fetchUsers = async () => {
    console.log("fetchUsers")
    try {
      const data = await axios.get(url + "/users");
      console.log("fetched user : ", data.data);
      setUsers(data.data);
    } catch (error) {
      setError(error.message);
    }
  };
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  }
  const checkUser = (checkedUser) => {
    try{
    setError("");
    const currentUser = users.find((u) => u.username == checkedUser.username);
    currentUser
      ? currentUser.password == checkedUser.password
        ? setUser(currentUser)
        : setError("wrong Password")
      : setError("Wrong Username");
    console.log("checkedUser ", checkedUser);
    console.log("user ", user);
    }catch(error){
      setError(error.message)
    }
  };

  return (
    <UserContext.Provider
      value={{ user , getUser, setUser, checkUser , error}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

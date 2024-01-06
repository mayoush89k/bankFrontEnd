import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const url = "https://bankapi-gswf.onrender.com";
  // const url = "https://easy-teal-sea-urchin-cap.cyclic.app"
  // const url = "http://localhost:3000";

  const [accounts, setAccounts] = useState({});
  const [response, setResponse] = useState("");
  const { user } = useUser();
  useEffect(() => {
    fetchAccounts();
  }, [user]);

  const fetchAccounts = async () => {
    const data = await axios.get(url + "/accounts/user/" + user._id);
    console.log("data: ", data);
    setAccounts(data.data);
  };

  const addAccount = async () => {
    const newAccount = await axios.post(url + "/accounts/user/" + user._id);
    setResponse(newAccount.data);
    setTimeout(() => {
      fetchAccounts();
    }, 2000);
  };

  return (
    <AccountContext.Provider
      value={{ accounts, setAccounts, fetchAccounts, addAccount, response ,setResponse}}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);

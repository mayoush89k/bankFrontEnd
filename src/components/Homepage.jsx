import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, checkUser,error } = useUser();
  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    checkUser({ username, password });
  };

  return (
    <div className="Homepage">
      {!user?.username && (
        <div id="form">
          <h1>Login</h1>
          <form action="" onSubmit={handleSubmit}>
            <label>{error}</label>
            <input
              type="text"
              placeholder="Username: "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password: "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
      {user.username && (
        <div>
          <h1>welcome {user.username} </h1>
          <p>
            click to <Link to={"/user"}>start</Link>
          </p>
        </div>
      )}{" "}
    </div>
  );
}

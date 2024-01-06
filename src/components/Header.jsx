import React from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import "./style.css";

export default function Header() {
  const { user, setUser } = useUser()
  return (
    <div className="Header">
      <ul>
        {user?.username == "admin" && (
          <li>
            <Link to={"/users"}>Users</Link>
          </li>
        )}
        {user?.username == "admin" && (
          <li>
            <Link to={"/accounts"}>Accounts</Link>
          </li>
        )}
        {!user?.username && (
          <li>
            <Link to={"/"}>Login</Link>
          </li>
        )}
        {user?.username && (
          <li>
            {user?.username &&
            <Link to={"/"} onClick={() => setUser({})}>
              Logout
            </Link>}
          </li>
        )}
          <li>
            <Link to={"/user"} onClick={() => setUser({})}>
              homepage
            </Link>
          </li>
      </ul>
    </div>
  );
}

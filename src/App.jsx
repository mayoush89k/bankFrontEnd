import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./context/UserContext";
import Homepage from "./components/Homepage";
import Users from "./components/Users";
import UserAccounts from "./components/UserAccounts";
import Accounts from "./components/Accounts";
import Header from "./components/Header";
import axios from "axios";
import Modal from "./components/Modal";
import Order from "./components/Order";
import { AccountProvider } from "./context/AccountContext";

function App() {
  return (
    <>
      <UserProvider>
        <AccountProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user" element={<UserAccounts />} />
              <Route path="/accounts" element={<Accounts />} />
            </Routes>
          </BrowserRouter>
        </AccountProvider>
      </UserProvider>
    </>
  );
}

export default App;

import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import { useUser } from "../context/UserContext";
import styled from "styled-components";
import Order from "./Order";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  hight: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;
const ModalBody = styled.div`
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
`;

export default function UserAccounts() {
  const { getUser } = useUser();
  const { accounts, setAccounts, addAccount, response, setResponse } =
    useAccount();
  const [currentAccount, setCurrentAccount] = useState({});
  const [order, setOrder] = useState("");
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <div>
      {accounts.length == 0 && (
        <div>
          No Accounts Found <Link>add here</Link>
        </div>
      )}
      {accounts.length > 0 && (
        <div>
          {accounts.map((a) => (
            <div key={a._id} id="accountContainer">
              <h1>
                <b>Account Number: </b>
                {a.accountNumber}
              </h1>
              <h2>
                <b>Cash: </b> {a.cash}
              </h2>
              <h2>
                <b>Credit: </b> {a.credit}{" "}
              </h2>
              <div id="buttons">
                <button
                  onClick={() => {
                    setCurrentAccount(a);
                    setOrder("Withdraw");
                    setShouldShow(true);
                  }}
                >
                  Withdraw
                </button>
                <button
                  onClick={() => {
                    setOrder("Credit");
                    setCurrentAccount(a);
                    setShouldShow(true);
                  }}
                >
                  Credit
                </button>
                <button
                  onClick={() => {
                    setCurrentAccount(a);
                    setShouldShow(true);
                    setOrder("Deposit");
                  }}
                >
                  Deposit
                </button>
                <button
                  onClick={() => {
                    setCurrentAccount(a);
                    setShouldShow(true);
                    setOrder("Transfer");
                  }}
                >
                  Transfer
                </button>
              </div>
            </div>
          ))}
          <p>{response}</p>
          <button
            onClick={() => {
              addAccount();
              setTimeout(() => {
                setResponse("");
              }, 2000);
            }}
          >
            Add more Account
          </button>
          {shouldShow && (
            <ModalBackground onClick={() => setShouldShow(false)}>
              <ModalBody onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShouldShow(false)}>X</button>
                <Order
                  orderType={order}
                  account={currentAccount}
                  setShouldShow={setShouldShow}
                />
              </ModalBody>
            </ModalBackground>
          )}
        </div>
      )}
    </div>
  );
}

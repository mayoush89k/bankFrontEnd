import axios from "axios";
import React, { useState } from "react";
import { useAccount } from "../context/AccountContext";

export default function Order({ orderType, account, setShouldShow }) {
  const [amountValue, setAmountValue] = useState(0);
  const [transferTo, setTransferTo] = useState(0);
  const { fetchAccounts } = useAccount();
  const [response, setResponse] = useState("");
  const url = "https://bankapi-gswf.onrender.com";

  const timer = () => {
    setTimeout(() => {
      setShouldShow(false);
    }, 2000);
  };
  const fetchWithdraw = async (amount) => {
    try {
      const data = await axios.put(`${url}/accounts/withdraw/${account._id}`, {
        amount: parseFloat(amount),
      });
      console.log("url ", `${url}/accounts/withdraw/${account._id}`);
      setResponse(data.data);
      timer();
      fetchAccounts();
    } catch (error) {
      setResponse(error.message);
    }
  };
  const fetchDeposit = async (amount) => {
    try {
      const data = await axios.put(`${url}/accounts/deposit/${account._id}`, {
        amount: parseFloat(amount),
      });
      setResponse(data.data);
      timer();
      fetchAccounts();
    } catch (error) {
      setResponse(error.message);
    }
  };
  const fetchCredit = async (amount) => {
    try {
      const data = await axios.put(`${url}/accounts/credit/${account._id}`, {
        amount: parseFloat(amount),
      });
      setResponse(data.data);
      timer();
      fetchAccounts();
    } catch (error) {
      setResponse(error.message);
    }
  };

  const fetchTransfer = async (amount, to) => {
    try {
      const data = await axios.put(
        `${url}/accounts/transfer/${account._id}/${to}`,
        {
          amount: parseFloat(amount),
        }
      );
      setResponse(data.data);
      timer();
      fetchAccounts();
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div className="Order">
      Order
      <h1>{orderType}</h1>
      <div id="order-form">
        <label>{response}</label>
        <br />
        <input
          type="number"
          placeholder="amount"
          value={amountValue}
          onChange={(e) => {
            setAmountValue(Number(e.target.value));
          }}
        />
        {orderType == "Transfer" && (
          <input
            type="number"
            placeholder="To"
            value={transferTo}
            onChange={(e) => {
              setTransferTo(e.target.value);
            }}
          />
        )}
        <button
          onClick={() => {
            switch (orderType) {
              case "Withdraw":
                fetchWithdraw(amountValue);
                break;

              case "Deposit":
                fetchDeposit(amountValue);
                break;
              case "Credit":
                fetchCredit(amountValue);
                break;
              case "Transfer":
                fetchTransfer(amountValue, transferTo);
                break;

              default:
                break;
            }
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

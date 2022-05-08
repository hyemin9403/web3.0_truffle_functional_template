import React, { useEffect, useState } from "react";
import Caver from "caver-js";

// import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

export const TransactionsProvider = ({ children }) => {
  const { klaytn } = window;
  const caver = new Caver(klaytn);
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState({
    addr: "",
    balance: "",
  });

  const handleConnect = async () => {
    if (window.klaytn === undefined)
      return alert("카이카스 지갑을 설치해주세요!");

    try {
      // account 불러오기
      const acc = await window.klaytn.enable();
      const balance = await caver.klay.getBalance(acc[0]);
      const _balance = +caver.utils.fromPeb(balance);

      setCurrentAccount((prevState) => {
        return {
          ...prevState,
          addr: acc[0],
          balance: _balance.toFixed(2),
        };
      });

      setWalletConnected((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        handleConnect,
        isWalletConnected,
        setWalletConnected,
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

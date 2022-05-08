import React, { useContext, useEffect } from "react";
import doiImage from "../img/doi.gif";

import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";

const Main = () => {
  let navigate = useNavigate();
  const { handleConnect, currentAccount, isWalletConnected } =
    useContext(TransactionContext);

  const handleProfile = async () => {
    if (isWalletConnected) {
      navigate("/profile");
    } else {
      alert("카이카스 지갑을 연결하세요!");
      handleConnect();
    }
  };

  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div className="main">
      <div className="wallet__fixed">
        <p>{`address(지갑주소) = ${currentAccount.addr}`}</p>
        <p>{`balance(잔고) = ${currentAccount.balance} Klay`}</p>
        <p>{`isWalletConnected:${isWalletConnected}`}</p>
      </div>
      <img src={doiImage} alt="" className="main__img" />
      <div className="title">
        <h1 className="title__text">DOI's HOSPITAL</h1>
      </div>
      <div className="connect">
        <button className="connect__btn" onClick={handleProfile}>
          Go to Profile
        </button>
      </div>
    </div>
  );
};

export default Main;

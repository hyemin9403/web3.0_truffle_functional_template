import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

const Account = () => {
  const { handleConnect, currentAccount } = useContext(TransactionContext);
  return (
    <div>
      <div className="wallet__fixed">
        <p>{`address(지갑주소) = ${currentAccount.addr}`}</p>
        <p>{`balance(잔고) = ${currentAccount.balance} Klay`}</p>
      </div>
    </div>
  );
};

export default Account;

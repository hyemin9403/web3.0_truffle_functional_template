import React, { useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {
  const [defaultState, setDefaultState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
  });

  const runExample = async () => {
    const { accounts, contract } = defaultState;
    if (contract != null) {
      try {
        // Stores a given value, 5 by default.
        await contract.methods.set(5).send({ from: accounts[0] });
        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();
        // Update state with the result.
        setDefaultState((prevState) => ({
          ...prevState,
          storageValue: response,
        }));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];

      // 변경한 부분! - 내 지갑으로 스마트 컨트랙트 배포 후 메타마스크 연결(꼭 해줘야함. 안그러면 주소를 찾을 수 없다고 에러)
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        "0xE0c9E3FfBE96F021331649F1eD8131EF52F6c5Aa"
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      setDefaultState((prevState) => {
        return {
          ...prevState,
          web3,
          accounts,
          contract: instance,
        };
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );

      console.error(error);
    }
  }, []);

  console.log(defaultState, typeof defaultState.storageValue);

  runExample();

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <p>
        If your contracts compiled and migrated successfully, below will show a
        stored value of 5 (by default).
      </p>
      <p>
        Try changing the value stored on <strong>line 42</strong> of App.js.
      </p>
      <div>The stored value is: {defaultState.storageValue}</div>
    </div>
  );
};

export default App;

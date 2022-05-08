import React from "react";

const abi = require("./erc1155.json");
const Caver = require("caver-js");

export const CollectionContext = React.createContext();

export const CollectionProvider = ({ children }) => {
  async function getLegacyHoldings(address) {
    const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");

    const doi = new caver.contract(
      abi,
      "0x426d3ca8a14a67b47f17736cb5787a09281b0be0"
    );

    const len = 200;
    // 같은 account로 채워진 array(200개)
    const accounts = Array(len).fill(address);
    // 1-200까지 있는 array
    const ids = Array.from({ length: len }, (_, i) => i + 1);
    // res에 balance가 있는지 없는지를 표시한 200개짜리 array가 변수 res에 return됨.
    const res = await doi.methods.balanceOfBatch(accounts, ids).call();

    const tokenURIs = {};
    let id = 1;
    for (let i of res) {
      if (i != "0") {
        let uri = await doi.methods.uri(id).call();
        tokenURIs[id] = uri;
      }
      id++;
    }
    return tokenURIs;
  }

  return (
    <CollectionContext.Provider
      value={{
        getLegacyHoldings,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

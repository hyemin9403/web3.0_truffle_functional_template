const abi = require("./erc1155.json");
const Caver = require("caver-js");

async function main() {
  const caver = new Caver("https://public-node-api.klaytnapi.com/v1/cypress");

  const doi = new caver.contract(
    abi,
    "0x426d3ca8a14a67b47f17736cb5787a09281b0be0"
  );

  const lucky = "0xD1b1a726169ABb13a8638CE5A1A800424778B430";

  const len = 200;
  // 같은 account로 채워진 array(200개)
  const accounts = Array(len).fill(lucky);
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
  console.log(tokenURIs);
}

main();

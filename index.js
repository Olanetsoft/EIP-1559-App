const http = require("http");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// Using WebSockets
const web3 = createAlchemyWeb3(
  "wss://eth-mainnet.alchemyapi.io/v2/<key>" // Websocket URL
);

const formatOutput = (data, numBlocks) => {
  let blocksOutput = [];

  for (let i = 0; i < numBlocks; i++) {
    blocksOutput.push({
      blockNumber: data.oldestBlock + i,
      baseFeePerGas: Math.round(Number(data.baseFeePerGas[i]) / 10 ** 9),
      gasUsedRatio: data.gasUsedRatio[i],
      reward: data.reward[i].map((r) => Math.round(Number(r) / 10 ** 9)),
    });
  }

  return blocksOutput;
};

web3.eth.getFeeHistory(20, "latest", [25, 50, 75]).then((data) => {
  console.log(formatOutput(data, 20));
});

//create a server object:
http
  .createServer(function (req, res) {
    res.write(
      "Hello World! This is an Ethereum Gas Price Tracker using EIP-1559 Standard !!!"
    ); //write a response to the client
    res.end(); //end the response
  })
  .listen(80); //the server object listens on port 80

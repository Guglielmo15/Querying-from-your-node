import './App.css';
import { useState } from 'react';
import Web3 from 'web3';
import { ethers } from "ethers";

function App() {
  const [blockHeight, setBlockHeight] = useState(0);
  const [chainId, setChainId] = useState(0);
  const [balance, setBalance] = useState(0);
  const [txCount, setTxCount] = useState(0);

  // Insert your node HTTPS endpoint here
  const node_url = "https://nd-226-820-485.p2pify.com/e6b74d1784b9492391ec54772a48ac5a"; 
  const web3 = new Web3(node_url)

  web3.eth.getBlockNumber((err, block) => { 
    setBlockHeight(block)
  })
  
  web3.eth.getChainId((err, chain) => {
    setChainId(chain)
  })

  web3.eth.getBalance("0x343462E22a1af180316BC7875ecedCbb21E6d593", "latest", (err, balance) => {
    let res = ethers.utils.formatEther(balance);
    res = Math.round(res * 1e3) / 1e3;
    setBalance(res)
  })

  web3.eth.getTransactionCount("0x343462E22a1af180316BC7875ecedCbb21E6d593", "latest", (err, nonce) => {
    setTxCount(nonce)
  })

  return (
    <div className="App">
      <p id="title">Querying data from my Chainstack node</p>
      <table>
        <tbody>
          <tr id="trHead">
            <td>Current block</td>
            <td>Chain ID</td>
            <td>Balance</td>
            <td>No. Txs</td>
          </tr>
          <tr>
            <td>{blockHeight}</td>
            <td>{chainId}</td>
            <td>{balance} ETH</td>
            <td>{txCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;

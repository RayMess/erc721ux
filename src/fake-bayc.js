import './FakeBAYC/FakeBAYC';
import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';


const contractAdresse="0x6b740C7a965d75A4801642Fabc650DA92CeA47ef";
const abi = require('./FakeBAYC/FakeBAYC.json').abi;

const Web3 = require('web3');


let web3 = new Web3('wss://rinkeby.infura.io/ws/v3/6f0414eda8234413b03a994f0e7413b1');


const contract = new web3.eth.Contract(abi, contractAdresse);


function FakeBAYC(){
    

    
    const mintNftHandler = () => { 
        try {
            const { ethereum } = window;
      
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const Contract = new ethers.Contract(contractAdresse, abi, signer);
      
              console.log("Done");
              let token = Contract.claimAToken();
    
      
            } else {
              console.log("Retry");
            }
      
          } catch (err) {
            console.log(err);
          }
    }

    const mintNftButton = () => {
    return (
        <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
        Claim token
        </button>
    )
    }

    useEffect(() => {
    }, [])


  const [tokenname,setName]= useState("");
  const [tokensupply,setSupply]=useState(0);
  useEffect(async () => {
      setName((await contract.methods.name().call()));
      setSupply(( await contract.methods.totalSupply().call()))
         
  });
  
  return (
    <div>
      <header>
        <h2>Welcome</h2>
        <br></br>
      </header>
      <br></br>
      <h1>fakeBayc</h1>
      <div>
            <p>Name of the token : {tokenname}</p>
            <p>Supply : {tokensupply}</p>
            <form>
                <label > select the Id you're intrested in </label>
                <input
                id = 'id'
                type="number"
                min = '1'
                max = {tokensupply}
                placeholder = '1'
                />
                <input type="submit" value="Submit"></input>
            </form>
            <p id = 'meta'></p>
        </div>
        <br></br>
        <h1>Do you to go to mint ?</h1>
        <div>
          {mintNftButton()}
      </div>
    </div>
  );
  }
  
  export default FakeBAYC;
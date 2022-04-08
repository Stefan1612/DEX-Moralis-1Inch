import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {ethers} from "ethers";
import React, { useState, useEffect } from 'react';
import Modal from "./Components/Modal.js"
const {utils, BigNumber} = require('ethers');


function App() {

  
  const [account, setAccount] = useState("")  

  //provider metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum)

   //requesting account and chainId when user first connected to metamask
   useEffect(() =>{ 
    FirstLoadGettingAccount()
    gettingNetworkNameChainId()     
    loadAllTokens()
  },[])

  async function FirstLoadGettingAccount(){
    if(typeof window.ethereum !== undefined){
      try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      } catch (error) {
        console.error(error);
      }
    }
   else {
       window.alert("Install Metamask!")
    }
  }

  //on chain change
  useEffect(() =>{
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
       window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
  },[])


  function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  //on account change
  useEffect(() =>{
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
       window.ethereum.removeListener('accountsChanged',     handleAccountsChanged)
      }
  },[])

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
    }   
    else if (accounts[0] !== account) {
      setAccount(accounts[0])
      window.location.reload();;      
    } 
  }
  //network
  const [network, setNetwork] = useState({
    chanId: "",
    name: ""
  })
  async function gettingNetworkNameChainId(){
    const network = await provider.getNetwork()
    setNetwork(network)
  }

  //used to calculate your Eth balance from bigNum
  function bigNumIntoEther4Decimals (data) {
    // from stackexchange https://ethereum.stackexchange.com/questions/84004/ethers-formatetherwei-with-max-4-decimal-places/97885
    let remainder = data.mod(1e14);
    console.log(utils.formatEther(data.sub(remainder)));
    let res = utils.formatEther(data);
    res = Math.round(res * 1e4) / 1e4;
    return res
  }

  const [modalState, setModalState] = useState(false);

  function buttonClicked(){
    setModalState(true)
  }

  function closeModal(e){
    setModalState(false)
  }

  async function loadAllTokens(){
    
  }
  
  if(modalState){
    return(<div  id="token-modal"tabindex="-1" role="dialog">
    {modalState && <div class="modal-dialog" role="document">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Select Token</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={(e) => closeModal(e)}>&times;</span>
        </button>
      </div>
    <div class="modal-body">
      <p>Modal body text goes here.</p>
   </div>
    
  </div>
</div>}
    

</div>
  

    )
  }

  return (
    <div className="App">
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">My DEX</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <button id="login_button" class="btn btn-outline-primary my-2 my-sm-0 " type="submit" onClick={(e) => FirstLoadGettingAccount()}>Sign in with Metamask</button>
            <div>{account}</div>
        </div>
      </nav>
      
    <div class="container">
        <div class="row">
            <div class="col col-md-6 offset-md-3" id="window">
                <h4>Swap</h4>
                <div id="form">
                    <div class="swapbox">
                        <div class="swapbox_select token_select" id="from_token_select">
                            <img class="token_image" id="from_token_img"/>
                            <span id="from_token_text" onClick={(e) => buttonClicked(e)}>Eth</span>
                        </div>
                        <div class="swapbox_select">
                            <input class="number form-control" placeholder="amount" id="from_amount"/>
                        </div>
                    </div>
                    <div class="swapbox">
                        <div class="swapbox_select token_select"  id="to_token_select">
                            <img class="token_image" id="to_token_img"/>
                            <span id="to_token_text" onClick={(e) => buttonClicked(e)}>USDT</span>
                        </div>
                        <div class="swapbox_select">
                            <input class="number form-control" placeholder="amount" id="to_amount"/>
                        </div>
                    </div>
                    <div>Estimated Gas: <span id="gas_estimate"></span></div>
                    <button disabled class="btn btn-large btn-primary btn-block" id="swap_button">
                        Swap
                    </button>
                </div>
            </div>
        </div>
    </div>
    
    </div>
  );
}

export default App;

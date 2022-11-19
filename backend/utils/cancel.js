const cancelTx = async () => {
    const API_URL = "https://eth-goerli.g.alchemy.com/v2/BH41mPci5pB8kKrJXtG9jHfJB1QfPobP";
    const PRIVATE_KEY = require('./constants').private_key;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = "0xcdA366B154b91F55Cd187995F2b5D0B7390f03c6";
    const nonce = await web3.eth.getTransactionCount(myAddress, "latest");
  
    const transaction = {
      gasPrice: web3.utils.toHex(web3.utils.toWei('1000', 'gwei')),
      gasLimit: 53000,
      nonce: nonce,
    };
    const replacementTx = {
      gasPrice: web3.utils.toHex(web3.utils.toWei('1000', 'gwei')),
      gasLimit: 53000,
      nonce: nonce,
    };
  
    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);
    const signedReplacementTx = await web3.eth.accounts.signTransaction(replacementTx, PRIVATE_KEY);
  
    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (error, hash) {
      if (!error) {
        console.log(
          "The hash of the transaction we are going to cancel is: ",
          hash
        );
      } else {
        console.log(
          "Something went wrong while submitting your transaction:",
          error
        );
      }
    });
  
    web3.eth.sendSignedTransaction(signedReplacementTx.rawTransaction, function (error, hash) {
      if (!error) {
        console.log(
          "The hash of your replacement transaction is: ",
          hash,
          "\n Check Alchemy's Mempool to view the status of your transactions!"
        );
      } else {
        console.log(
          "Something went wrong while submitting your replacement transaction:",
          error
        );
      }
    }).once("sent", () => {
      let timeout = new Promise(() => {
        let id = setTimeout(() => {
          clearTimeout(id);
          process.exit()
        }, 3000);
      });
      return timeout;
    });
    
  };
  
  cancelTx();
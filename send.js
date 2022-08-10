var Tx     = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3('https://liberty10.shardeum.org/')

const ToAccount ="to whom your sending"; // change this tkt to destination address
const privatekey=Buffer.from('Replace this txt with Your private Key','hex'); // private key in between the quotes

web3.eth.getTransactionCount(ToAccount,(err,txCount)=>{
    //building a transaction
    const txObject = {
    to:       ToAccount,
    value:    web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    gasLimit: web3.utils.toHex('210000'),
    gasPrice: web3.utils.toHex(web3.utils.toWei('5', 'gwei'))
  }
// Sign the transaction
  const tx = new Tx(txObject)
  tx.sign(privatekey)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  // Broadcast the transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log( txHash)
	//console.log(raw)
  })
})

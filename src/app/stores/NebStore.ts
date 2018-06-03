const nebulas = require("nebulas");
const NebPay = require("nebpay.js");
const nebPay = new NebPay();

/*
var intervalQuery;
function listener(resp) {
    console.log("response of push: " + JSON.stringify(resp))
    var respString = JSON.stringify(resp);
    if(respString.search("rejected by user") !== -1){
        clearInterval(intervalQuery)
        alert(respString)
    }else if(respString.search("txhash") !== -1){
        //alert("wait for tx result: " + resp.txhash)
    }
}
*/

export class NebStore{
	private neb;
	private account;
	private infuraURL = {
		testnet: NebPay.config.testnetUrl,
		mainnet: NebPay.config.mainnetUrl,
	};
	private node_url;

	constructor({node_url}){
        this.neb = new nebulas.Neb();
        this.account = nebulas.Account;
        this.node_url = node_url || this.infuraURL.mainnet;
        this.neb.setRequest(new nebulas.HttpRequest(this.node_url));
        console.log(nebPay);
	}
	changeNodeUrl = (node_url) => {
        this.node_url = node_url;
        this.neb.setRequest(new nebulas.HttpRequest(this.node_url));
	}
	call = (to, callFunction, callArgs) => {
        var from = this.account.NewAccount().getAddressString();
        const value = "0";
        const nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var contract = {
            "function": callFunction,
            "args": JSON.stringify(callArgs),
        }
      	return new Promise( (resolve, reject) => {
        	this.neb.api.call(from, to , value, nonce, gas_price, gas_limit, contract).then( resp => {
        		const result = JSON.parse(resp.result);
        		if(!result && resp.execute_err){
        			reject(resp.execute_err);
        		}
        		resolve(result);
        	}).catch(function (err) {
        		reject(err);
        	})		
        });
	}
	sendTransaction = (to, value, callFunction, callArgs, listener=(_)=>{}) => {
		//callArgs = ["wqwerty",[10,20,30],true,[0,100],1,[1,2,3],155555];
        nebPay.call(to, value, callFunction, JSON.stringify(callArgs), {
            listener: listener,
            callback: this.node_url, // its the node request url dunno why called callback lel
        });
	}
}
export default NebStore;


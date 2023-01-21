import React, {Component} from 'react';
import Web3 from 'web3';
import {DEPLOYED_CONTRACT_ADDRESS , DEPLOYED_CONTRACT_ABI} from './config'

class BankAccount extends Component{

    async loadBlockChainData(){
        let web3 = await new Web3(Web3.givenProvider);
        let accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        this.setState({
            account: accounts[0]
        })
        let accountContact = await new web3.eth.Contract(DEPLOYED_CONTRACT_ABI , DEPLOYED_CONTRACT_ADDRESS);
        this.setState({
            accountContact
        })
        
        let amount = await accountContact.methods.getBalance().call();

        this.setState({
            amount: amount
        })

        // console.log("Stateddddddddddddddddddddddddddddd : ", this.state)
    }

    // async withdrawMoney(){
    //     console.log("dsssssssssssssssssssssssssssssssss: ", this.state)
        // this.setState({
        //     isLoading: true
        // })

        // console.log("started................")

        // this.state.accountContact.methods.withdrawBalance(50).send({from: this.state.account}).then(data =>{
        //     this.setState({
        //         isLoading: false
        //     })

        //     console.log('ended...................')
        // })
    // }

    componentDidMount(){
        this.loadBlockChainData();
        // this.withdrawMoney();
    }

    constructor(props){
        super(props);
        this.state = {
            account : '',
            ammount : 0,
            isLoading: false
        }
    }

    render(){
        return(
            <div>
                <h1>Hello, World</h1>
                <p>Your account address is :  {this.state.account}</p>
                <p>Current ammount is : {this.state.amount}</p>
                {/* <button onClick={this.withdrawMoney}>Withdraw</button>
                <button>Deposit</button> */}
            </div>
        )
    }
    
}

export default BankAccount;
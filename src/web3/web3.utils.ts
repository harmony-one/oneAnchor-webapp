import Web3 from "web3";
import { AbiItem } from 'web3-utils'

import tokensABI from './contracts/tokens-abi';
import incomeABI from './contracts/income-abi';


export type receiptType = {
  blockHash?: string;
  blockNumber?: number;
  contractAddress?: any;
  cumulativeGasUsed?: number;
  events?: any
  from?: string;
  gasUsed?: any;
  logsBloom?: string;
  status?: boolean;
  to?: string;
  transactionHash?: string;
  transactionIndex?: number;
  errorMessage?: string;
}

if (window.ethereum) {
  window.ethereum.enable();
} 

export const AUST_CONTRACT = process.env.REACT_APP_AUST_CONTRACT_ADDRESS;
export const INCOME_CONTRACT_ADDRESS = process.env.REACT_APP_INCOME_CONTRACT_ADDRESS;

const Web3Client = window.ethereum ? new Web3(Web3.givenProvider) : null;

/*
 * Instanciated web3 Contract
 * @param {any} [abi] Contract's abi
 * @param {string} [address] contract's address
 * @returns {any} web3 Contract 
 */
const getContract = (abi: any, address: string) => {
  if (Web3Client) {
    return new Web3Client.eth.Contract(abi as AbiItem, address);
  }
  return null;
}

/*
 * Retrieves token balance
 * @param {any} [walletAddress] Wallet Address
 * @param {string} [tokenAdress] Token address
 * @param {any} setBalance Hooks call back to set address.  
 * @return {void} 
 */
export const getTokenBalance = async (walletAddress: any, tokenAddress: string, setBalance: any) => {
  const contract = getContract(tokensABI, tokenAddress);
  if (contract) {
    const result = await contract.methods.balanceOf(walletAddress).call(); 
    setBalance(parseFromWei(result));
  }

}

/*
 * Handles Anchor's deposit ONE -> aUST
 * @param {any} [wallet] Wallet object
 * @param {string} [amount] Amount to be deposit
 * @param {any} [setModal] Hooks call back to enable Modal (true)
 * @param {any} [setResult] Hooks call back to display transaction's result
 * @param {any} [setValidationError] Hooks call back to display error message      
 * @return {void}
 */
export const incomeDeposit = async (wallet: any, amount: string, setModal: any, setResult: any, setValidationError: any) => {
  const amountWei = parseToWei(amount);
  console.log('COMPARSION:*******',amountWei,wallet.balance);
  if (wallet.balance > amountWei) {
    const contract = getContract(incomeABI,INCOME_CONTRACT_ADDRESS!);
    console.log('contract INCOME',contract);
    if (contract) {
      setModal(true);
      await contract.methods.deposit()
      .send({ value: 1000, from: wallet.account})// amountWei, from: wallet.account})
      .on('confirmation',(confirmationNumber: any, receipt: any)=> {
        console.log('confirmationNumber*******************',confirmationNumber);
        //console.log('recepit',receipt);
        // setResult(receipt);gijijggijrt
      })
      .on('receipt', (receipt: any ) => {
        console.log('ON RECEIPT **********', receipt);
        setResult(receipt);
      })
      .on('error', (error: any, receipt: any)=> {
        console.log('ON ERROR ***********', error);
        console.log('ON ERROR RECEIPT***********', receipt);
        
        //receipt = { ...receipt,'}; //["errorMessage"] = ;
        setResult(receipt);
      });
    }
  } else {
    setValidationError('Not enough funds');
  }
}



/*export const incomeDeposit2 = async (wallet: any, amount: string, setValidationErrorL: any) => {
  try {
    const amountWei = parseToWei(amount);
    if (parseInt(wallet.balance) > parseInt(amountWei)) {
      const contract = getContract(incomeABI,incomeContractAddress);
      const result = await contract.methods.deposit().send({ value: amountWei, from: wallet.account});
      return result; 
    } else {
      setValidationError('Not enough funds');
      return null;
    }
  } catch(e) {
    console.log(e);
    //console.log('HASH',JSON.parse(e));
    console.log('HASH2',e.receipt.transactionHash);
    throw (e); //'Transaction cancel');
  } 

}*/

/*
 * Handles Anchor's withdraw (aUST -> ONE)
 * 
 * @return {void}
 */
export const incomeWithdraw = async (wallet: any, amount: string, setValidationError: any) => {
  try {
    const amountWei = parseToWei(amount);
    if (wallet.balance > amountWei) {
      const contract = getContract(incomeABI,INCOME_CONTRACT_ADDRESS!);
      if (contract) {
        const result = await contract.methods.deposit().send({ value: amountWei, from: wallet.account});
        return result; 
      }
      return null;
    } else {
      setValidationError('Not enough funds');
      return null;
    }
  } catch(e) {
    console.log(e)
    throw (e); //'Transaction cancel');
  } 

}

/*
 * Parse wei to float 
 * @param {any} [wei] Wei amount to be parsed
 * @param {number} [fixed=2] Decimals (default => 2) 
 * @return {float} wei's float representation
 */
export const parseFromWei = (wei: any, fixed=2) => {
  console.log('PARSE FROM WEI ********',wei);
  if (wei) {
    //console.log('PARSE FROM WEI',Web3Client!.utils.fromWei(wei));
    return parseFloat(Web3Client!.utils.fromWei(wei + "")).toFixed(fixed);   
  }
  return '';
}

/*
 * Parse wei to float 
 * @param {any} [amount] amount to be parsed to wei
 * @return {float} wei's float representation
 */
export const parseToWei = (amount: any) => {
  return Web3Client!.utils.toWei(amount); 

}

/*
 * Truncate an web3 address.
 * @param {string} [address] amount to be parsed to wei
 * @param {number} [pos] digits to show at the begining/end of the contract
 * @return {string} the truncated address
 */
export const truncateAddressString = (address: string, pos = 4) => {
  if (!address) {
    return '';
  }
  const first = address.slice(0,pos);
  const last = address.slice(-pos);
  return `${first}...${last}`;
}
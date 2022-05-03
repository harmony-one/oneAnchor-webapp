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
  gasUsed?: number;
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
const incomeContractAddress = process.env.REACT_APP_INCOME_CONTRACT_ADDRESS;

const Web3Client = window.ethereum ? new Web3(Web3.givenProvider) : null;

const getContract = (abi: any, address: string) => {
  if (Web3Client) {
    return new Web3Client.eth.Contract(abi as AbiItem, address);
  }
  return null;
}

export const getTokenBalance = async (walletAddress: any, tokenAddress: string, setBalance: any) => {
  const contract = getContract(tokensABI, tokenAddress);
  if (contract) {
    console.log("getTokenBalance **********",walletAddress, tokenAddress, contract);
    const result = await contract.methods.balanceOf(walletAddress).call(); 
    setBalance(parseFromWei(result));
  }

}

export const incomeDeposit = async (wallet: any, amount: string, setModal: any, setResult: any, setValidationError: any) => {
  const amountWei = parseToWei(amount);
  if (wallet.balance > amountWei) {
    const contract = getContract(incomeABI,incomeContractAddress!);
    if (contract) {
      setModal(true);
      await contract.methods.deposit()
      .send({ value: amountWei, from: wallet.account})
      .on('confirmation',(confirmationNumber: any,receipt: receiptType)=> {
        console.log('confirmationNumber',confirmationNumber);
        setResult(receipt);
      })
      .on('receipt', (receipt: receiptType ) => {
        console.log('ON RECEIPT');
        setResult(receipt);
      })
      .on('error', (error: any,receipt: receiptType )=> {
        receipt = { ...receipt,  errorMessage: 'Unable to complete transaction'}; //["errorMessage"] = ;
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

export const incomeWithdraw = async (wallet: any, amount: string, setValidationError: any) => {
  try {
    const amountWei = parseToWei(amount);
    if (wallet.balance > amountWei) {
      const contract = getContract(incomeABI,incomeContractAddress!);
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

export const parseFromWei = (wei: any) => {
  return parseFloat(Web3Client!.utils.fromWei(wei)).toFixed(2); 
}

export const parseToWei = (amount: any) => {
  return Web3Client!.utils.toWei(amount); 

}

export const truncateAddressString = (address: string, num = 12) => {
  if (!address) {
    return '';
  }
  const first = address.slice(0, num);
  const last = address.slice(-num);
  return `${first}...${last}`;
}
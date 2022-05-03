import React, { useState } from "react";
import { useWallet } from "use-wallet";
import { receiptType, incomeDeposit } from "web3/web3.utils";
import Modal from "components/modal/modal.component";
import "./deposit.styles.scss";
import { SimplePublicKey } from "@terra-money/terra.js";

export type resultType = {
  status?: boolean;
  transactionHash?: string,
  blockHash?: string,
  errorMessage: string
}

const Deposit: React.FC= () => {
  const [amount, setAmount] = useState('');
  const [validationError, setValidationError] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<receiptType>({
    status: true,
    transactionHash: "",
    blockHash: "",
    errorMessage : ""
  });
  const wallet = useWallet();

  const handleDeposit = async () => {
    setValidationError('');
    setResult({
      status: true,
      transactionHash: "",
      blockHash: "",
      errorMessage: ""
    });
    try {
      setIsProcessing(true);
      setButtonDisable(true);
      setOpenModal(true);
      setTimeout(() => {
        const test : receiptType = {
          blockHash: "0x9139ec7fab79751de67e7a93890f80c789d1915dda1374709e675da2294fd1ea",
          blockNumber: 26036026,
          contractAddress: null,
          cumulativeGasUsed: 2612544,
          events: {},
          from: "0x70709614bf9ad5bbab18e2244046d48f234a1583",
          gasUsed: 26634,
          logsBloom: "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          status: false,
          to: "0x32b57ddca08baf654597a395a5f5071694b0c54e",
          transactionHash: "0x828aca93a11bfc3f9c063d10b6ac81f85c8d1414acb78decfab57b5442467388",
          transactionIndex: 5
        }
        setResult(test);
        setButtonDisable(false);  
        setIsProcessing(false);
      }, 5000);

     /*

    
    
    
      if (wallet.isConnected()) {
        if (amount) {
          setIsProcessing(true);
          setButtonDisable(true);       
          await incomeDeposit(wallet,amount,setOpenModal,setResult,setValidationError);
          setButtonDisable(false);  
          setIsProcessing(false);
        } else {
          setValidationError('Please enter the Amount');
        }
      }*/
    } catch(e:any) {
      console.log(e);
      setIsProcessing(false);
      setButtonDisable(false);
      setResult({
        status: false,
        errorMessage: "Unable to complete transaction"
      }); 
      setValidationError('');
      setAmount('');
    }
  }
  
  const handleWithdraw = async () => {
    setValidationError('');
    setResult({
      status: true,
      transactionHash: "4234343234423",
      blockHash: "983798237498324739824324",
      errorMessage: ""
    });
    setOpenModal(true);
    /*try {
      if (wallet.isConnected()) {
        if (amount) {
          setButtonDisable(true)
          await incomeDeposit(wallet,amount,setValidationError);
          setButtonDisable(false);  
        } else {
          setValidationError('Please enter the Amount');
        }
      }
    } catch(e) {
      setButtonDisable(false);  
      console.log("catched",e);
      setValidationError('');
      setAmount('');
    }*/
  }

  return (
    <div className="deposit">
      <div className="deposit__title">Enter Amount</div>
      <input
        className="deposit__input"
        type="number"
        step="1"
        placeholder="0"
        value={amount}
        onChange={e => setAmount(e.target.value)}    
      ></input>
      <span className="deposit__total--warning">{validationError}</span>
      { openModal ? (<Modal title="Processing Transaction" content={null} actions={null} 
        result={result} isProcessing={isProcessing}
        setIsOpen={setOpenModal}  />) :
      (<div className="deposit__cta">
        <button className="deposit__button button" onClick={handleDeposit} disabled={buttonDisable}>Deposit</button>
        <button className="deposit__button button" onClick={handleWithdraw} disabled={buttonDisable}>Withdraw</button>
      </div>)}
    </div>
  );
};

export default Deposit;
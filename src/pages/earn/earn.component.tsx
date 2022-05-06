import React from "react";
// import { useWeb3React } from '@web3-react/core'
import Interest from "../../components/interest/interest.component";
import Deposit from "../../components/deposit/deposit.component";
import Balance from "../../components/balance/balance.component";

/*
 * Earn page component
 * Displays APY information, Deposit/Withdraw forms and aUST balance
 */
const EarnPage: React.FC = () => {
  // const { active, chainId, account } = useWeb3React();
  // console.log(active,chainId,account);

  return (
    <div className="main">
      <Interest />
      <Deposit />
      <Balance />
    </div>
  )
}

export default EarnPage;

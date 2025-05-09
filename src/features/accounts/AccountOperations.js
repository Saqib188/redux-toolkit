import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit,payLoan,requestLoan,withdrawl } from "./accountSlice";

function AccountOperations() {
const {loan:currentLoan,loanPurpose:currentLoanPurpose,balance:currentBalance,isLoading} = useSelector(store=>store.account)
console.log(currentLoanPurpose);


  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

console.log(depositAmount)
  const dispatch = useDispatch()
  // console.log(dispatch(deposit({depositAmount,currency})))

  function handleDeposit() {
    if(!depositAmount) return ;
    dispatch(deposit({amount : depositAmount,currency}))
    setDepositAmount("")
    setCurrency("")
  }

  function handleWithdrawal() {
if (!withdrawalAmount || !currentBalance>0 || withdrawalAmount>currentBalance) return ;
dispatch(withdrawl(withdrawalAmount))
setWithdrawalAmount("")

  }

  function handleRequestLoan() {
    if(currentLoan>0 || !loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount,loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    if (currentLoan <=0 ) return
    dispatch(payLoan())
  }

return (
  <div>
  <h2>Your account operations</h2>
    <div className="inputs">
      <div className="">
        <label htmlFor="">Deposit</label>
        <input type="number"
        value={depositAmount}
        onChange={e=>setDepositAmount(+e.target.value)}
        name="" id="" />
        <select 
        value={currency}
        onChange={e=>setCurrency(e.target.value)}
        name="" id="">
<option value="USD">US Dollar</option>
<option value="EUR"> Euro </option>
<option value="GBP"> British Pound </option>

       </select>
       <button onClick={handleDeposit} disabled={isLoading} > 
       {isLoading ? "converting the currency":

       `Deposit${depositAmount}`
       } 
        </button>
    </div>
    <div className="">
      <label htmlFor=""> WithDraw</label>
      <input 
      value={withdrawalAmount}
      onChange={e=>setWithdrawalAmount(+e.target.value)}
      />
      <button onClick={handleWithdrawal}>withDraw    {withdrawalAmount}</button>
    </div>
    <div>
      <label htmlFor=""> Request Loan </label>
      <input 
      value={loanAmount}
      onChange={e=>setLoanAmount(+e.target.value)}
      placeholder="Loan Amount"
      />
      <input type="text" 
      value={loanPurpose}
      onChange={e=>setLoanPurpose(e.target.value)}
      placeholder="Loan Purpose"
      />
      <button onClick={handleRequestLoan}>Request Loan </button>
    </div>
    {currentLoan >0 && 

      <div className="">
      <span>Pay Back ${currentLoan}({currentLoanPurpose})    </span>  
      <button onClick={handlePayLoan}>   Pay Loan</button>
    </div>
}
  </div>
  </div>
);
}

export default AccountOperations;

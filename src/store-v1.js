import {combineReducers, createStore } from "redux"
const initialStateAcc = {
    balance:0,
    loan:0,
    loanPurpose:''
}
const initialStateCustuomer = {
     fullName: "",
     nationalId :"",
     createdAt:""
}


function createCustomer (fullName,nationalId){
    return {
        type:"customer/createCustomer",payload:{fullName,nationalId,createdAt:new Date().toISOString() }
    } 

}

function updateName(fullName){
    return {type:"customer/updateName",payload:fullName}
}
function customerReducer(state = initialStateCustuomer,action){
    switch (action.type){
        case "customer/createCustomer":
            return {...state,fullName:action.payload.fullName,nationalId:action.payload.nationalId,createdAt:action.payload.createdAt}
        case "customer/updateName":
             return {...state,fullName:action.payload}
        default :
        return state;
    }
}

 
function accountReducer (state= initialStateAcc,action){
    switch (action.type) {
        case 'account/deposit':
            return {...state,balance:state.balance+action.payload}
    
        case 'account/withdraw':
            return {...state,balance: state.balance -action.payload}
        case 'account/requestLoan':
            if (state.loan >0 ) return state;
            return {...state, balance:state.balance+action.payload.amount,loanPurpose:action.payload.loanPurpose,loan:action.payload.amount}
        case 'account/payLoan':
            console.log(state,action,"payloan");
            
            return {...state, loan:0,loanPurpose:'',balance: state.balance-state.loan}
    
        default:
            return state;
    }
}


function deposit (amount){
    return {type:"account/deposit",payload:amount}
}
function withdraw (amount){
    return {type:"account/withdraw",payload:amount}
}
function requestLoan (amount,loanPurpose){
    return {type:"account/requestLoan",payload:{amount,loanPurpose}}
}
function payLoan (){
    return {type:"account/payLoan"}
}

const rootReducer  = combineReducers({
    account:accountReducer,
    customer:customerReducer
})


const  store = createStore(rootReducer)


store.dispatch(deposit(600))
console.log(store.getState());
store.dispatch(withdraw(500))

console.log(store.getState());
store.dispatch(requestLoan(1200,"buy a car"))
console.log(store.getState());  
store.dispatch(payLoan())


store.dispatch(createCustomer("Saqib",3330323692085))
console.log(store.getState());

// store.dispatch({type:"account/deposit", payload:500})
// store.dispatch({type:"account/withdraw", payload:200})
// store.dispatch({type:"account/requestLoan", payload:{amount:1000,loanPurpose:"buy a car"}})
// console.log(store.getState());
// store.dispatch({type:"account/requestLoan", payload:{amount:1000,loanPurpose:"buy a car"}})
// console.log(store.getState());
// store.dispatch({type:"account/payLoan"})
 


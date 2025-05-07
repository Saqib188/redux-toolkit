import { createSlice } from "@reduxjs/toolkit";
import reducer from "../accounts/accountSlice";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return { payload: { fullName, nationalId ,createdAt:new Date().toISOString()} };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateCustomer(state,action){
        state.fullName = action.payload
    }
  },
});
console.log(initialState);

export const {createCustomer,updateCustomer} = customer.actions;
export default customer.reducer;
// export function createCustomer (fullName,nationalId){
//    return {
//        type:"customer/createCustomer",payload:{fullName,nationalId,createdAt:new Date().toISOString() }
//    }

// }

// export function updateName(fullName){
//    return {type:"customer/updateName",payload:fullName}
// }
// export default function customerReducer(state = initialStateCustuomer,action){
//    switch (action.type){
//        case "customer/createCustomer":
//            return {...state,fullName:action.payload.fullName,nationalId:action.payload.nationalId,createdAt:action.payload.createdAt}
//        case "customer/updateName":
//             return {...state,fullName:action.payload}
//        default :
//        return state;
//    }
// }

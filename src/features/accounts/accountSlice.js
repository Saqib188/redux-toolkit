import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isError: false,
  isLoading: false,
  error: "",
};

export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }, thungAPI) => {
    console.log(amount);
    
    try {
      if (currency === "USD") {return amount;}
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      if (!res.ok) {
        throw new Error("Failed to convert currency");
      }
      const data =  await res.json();
      return data.rates.USD;
    } catch (error) {
      return thungAPI.rejectWithValue(error.meassage);
      
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    withdrawl(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        state.balance += action.payload.amount;
        state.loan += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
  extraReducers:builder =>{builder.addCase(deposit.pending,(state,action)=>{
    state.isLoading = true;
  }).addCase(deposit.fulfilled,(state,action)=>{
    state.isLoading = false;
    state.balance += action.payload;
  }).addCase(deposit.rejected,(state,action)=>{
    state.isLoading  = false;
    state.isError = true;
    state.error = action.payload || "failed";
    console.error(state.error);
    

  })

}
});

export const { withdrawl, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

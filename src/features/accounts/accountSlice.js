import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isError: false,
  isLoading: false,
  error: "",
};


/* 
// grok code 09.05.2025
export const deposit = createAsyncThunk(
  "account/deposit",
  async (arg, { rejectWithValue }) => {
    const { amount, currency } = arg || {}; // Safely destructure
    console.log("Thunk called with arg:", arg); // Debug
    try {
      console.log(amount, "deposit amount argu", currency, "currency argu");
      if (!amount || isNaN(amount) || amount <= 0) throw new Error("Invalid amount");
      if (!currency) throw new Error("Currency is required");
      if (currency === "USD") return amount;
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );
      if (!res.ok) throw new Error("Failed to fetch exchange rate");
      const data = await res.json();
      if (!data.rates?.USD) throw new Error("USD rate not available");
      console.log(data);
      return data.rates.USD;
    } catch (error) {
      console.error("Deposit error:", error.message);
      return rejectWithValue(error.message);
    }
  }
); */

export const deposit = createAsyncThunk(


  "account/deposit",
  async function ({amount, currency},thunkAPI) {

    try {
      if (currency === "USD") {return amount;}
      
    console.log(currency);
    
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
    );
    console.log(res);
    
    if (!res.ok) {throw new Error("Failed to convert")}
    const data = await res.json();

    console.log(data);

    return data.rates?.USD;
  

      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
  extraReducers: (builder) =>
    builder
      .addCase(deposit.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";

      })
      .addCase(deposit.fulfilled, (state, action) => {
        state.balance += action.payload;
        state.isLoading = false
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isError = true
        state.error = action.payload|| "Deposit Failed"
        console.log((action.payload,"rejected action "));
        state.isLoading= false
      }),  
});


export const { withdrawl, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;



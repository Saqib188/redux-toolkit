



 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to handle currency conversion and deposit
export const deposit = createAsyncThunk(
  "account/deposit",
  async ({ amount, currency }, thunkAPI) => {
    try {
      if (currency.toUpperCase() === "USD") {
        return amount;
      }

      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );

      if (!response.ok) {
        throw new Error("Failed to convert currency");
      }

      const data = await response.json();
      const convertedAmount = data.rates?.USD;

      return convertedAmount;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isError: false,
  isLoading: false,
  error: "",
};

// Slice
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
        state.isLoading = false;
      })
      .addCase(deposit.rejected, (state, action) => {
        state.isError = true;
        state.error = action.payload || "Deposit Failed";
        state.isLoading = false;
      }),
});

// Exports
export const { withdrawl, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

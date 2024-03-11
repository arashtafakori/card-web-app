import { createSlice } from "@reduxjs/toolkit";
import { httpRequestStatus } from "../../../../utils/httpRequest";
import { getCard } from "./api";
import { initialCard } from "../../models/card";

let cardReducer = {};

export let cardExtraReducer = (builder: any) => {
  builder.addCase(getCard.pending, (state: any, action: any) => {
    state.data = null;
    state.status = httpRequestStatus.Pending;
    state.error = null;
  })
  .addCase(getCard.fulfilled, (state: any, action: any) => {
    state.data = action.payload;
    state.status =  httpRequestStatus.Fullfilled;
    state.error = null;
  }) 
  .addCase(getCard.rejected, (state: any, action: any) => {
    state.data = null;
    state.status =  httpRequestStatus.Rejected;
    state.error = action.error;
  });
};

var cardSlice = createSlice({
  name: "card",
  initialState: initialCard,
  reducers: cardReducer,
  extraReducers: cardExtraReducer
});

export default cardSlice;


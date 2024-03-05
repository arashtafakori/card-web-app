import { createSlice } from "@reduxjs/toolkit";
import { httpRequestStatus } from "../../../../utils/httpRequest";
import { getIndex } from "./api";
import { initialIndex } from "../../models";

let indexReducer = {};

export let indexExtraReducer = (builder: any) => {
  builder.addCase(getIndex.pending, (state: any, action: any) => {
    state.data = null;
    state.status = httpRequestStatus.Pending;
    state.error = null;
  })
  .addCase(getIndex.fulfilled, (state: any, action: any) => {
    state.data = action.payload;
    state.status =  httpRequestStatus.Fullfilled;
    state.error = null;
  }) 
  .addCase(getIndex.rejected, (state: any, action: any) => {
    state.data = null;
    state.status =  httpRequestStatus.Rejected;
    state.error = action.error;
  });

};

var indexSlice = createSlice({
  name: "index",
  initialState: initialIndex,
  reducers: indexReducer,
  extraReducers: indexExtraReducer
});

export default indexSlice;


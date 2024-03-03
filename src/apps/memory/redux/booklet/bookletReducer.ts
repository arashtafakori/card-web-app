import { createSlice } from "@reduxjs/toolkit";
import { httpRequestStatus } from "../../../../utils/httpRequest";
import { getBooklet } from "./api";
import { initialBooklet } from "../../models/booklet";

let bookletReducer = {};

export let bookletExtraReducer = (builder: any) => {
  builder.addCase(getBooklet.pending, (state: any, action: any) => {
    state.data = null;
    state.status = httpRequestStatus.Pending;
    state.error = null;
  })
  .addCase(getBooklet.fulfilled, (state: any, action: any) => {
    state.data = action.payload;
    state.status =  httpRequestStatus.Fullfilled;
    state.error = null;
  }) 
  .addCase(getBooklet.rejected, (state: any, action: any) => {
    state.data = null;
    state.status =  httpRequestStatus.Rejected;
    state.error = action.error;
  });

};

var bookletSlice = createSlice({
  name: "booklet",
  initialState: initialBooklet,
  reducers: bookletReducer,
  extraReducers: bookletExtraReducer
});

export default bookletSlice;


import { createSlice } from "@reduxjs/toolkit";
import bookletReducer, { bookletExtraReducer } from "../reducers/bookletReducer";
import { ModelState} from '../../../../../utils/httpRequest';
import { Booklet, initialBooklet } from '../../../models/booklet';

var bookletSlice = createSlice({
  name: "booklet",
  initialState: initialBooklet,
  reducers: bookletReducer,
  extraReducers: bookletExtraReducer
});

export const { get } = bookletSlice.actions;
export default bookletSlice;
 

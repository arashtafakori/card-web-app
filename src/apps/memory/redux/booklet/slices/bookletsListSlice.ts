import { createSlice } from "@reduxjs/toolkit";
import bookletsListReducer, { bookletsListExtraReducer } from "../reducers/bookletsListReducer";
import { ModelState} from '../../../../../utils/httpRequest';
import { Booklet } from '../../../models/booklet';

var bookletsListSlice = createSlice({
  name: "booklets-list",
  initialState: ModelState.initiatePaginatedData<Booklet>(),
  reducers: bookletsListReducer,
  extraReducers: bookletsListExtraReducer
});

export const { add } = bookletsListSlice.actions;
export default bookletsListSlice;
 
 
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./general/reducers/notificationReducer";
import undoActionReducer from "./general/reducers/undoActionReducer";
import bookletsListSlice from "./booklet/bookletsListReducer";
import bookletSlice from "./booklet/bookletReducer";

let allReducers = {
  booklet: bookletSlice.reducer,
  bookletsList: bookletsListSlice.reducer,
  notification: notificationReducer,
  undoAction: undoActionReducer
};

let store = configureStore({
  reducer: allReducers
});

export default store;

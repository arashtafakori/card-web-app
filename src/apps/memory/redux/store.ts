import notificationReducer from "./booklet/reducers/notificationReducer";
import bookletsListSlice from "./booklet/slices/bookletsListSlice";
import bookletSlice from "./booklet/slices/bookletSlice";
import { configureStore } from "@reduxjs/toolkit";

let allReducers = {
  booklet: bookletSlice.reducer,
  bookletsList: bookletsListSlice.reducer,
  notification: notificationReducer,
};

let store = configureStore({
  reducer: allReducers
});

export default store;

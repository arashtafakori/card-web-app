import bookletsListSlice from "./booklet/slices/bookletsListSlice";
import bookletSlice from "./booklet/slices/bookletSlice";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./general/reducers/notificationReducer";

let allReducers = {
  booklet: bookletSlice.reducer,
  bookletsList: bookletsListSlice.reducer,
  notification: notificationReducer,
};

let store = configureStore({
  reducer: allReducers
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./general/reducers/notificationReducer";
import undoActionReducer from "./general/reducers/undoActionReducer";
import bookletsListSlice from "./booklet/bookletsListReducer";
import bookletSlice from "./booklet/bookletReducer";
import indexSlice from "./index/IndexReducer";
import indicesListSlice from "./index/indicesListReducer";

let allReducers = {
  booklet: bookletSlice.reducer,
  bookletsList: bookletsListSlice.reducer,
  index: indexSlice.reducer,
  indicesList: indicesListSlice.reducer,
  notification: notificationReducer,
  undoAction: undoActionReducer
};

let store = configureStore({
  reducer: allReducers
});

export default store;

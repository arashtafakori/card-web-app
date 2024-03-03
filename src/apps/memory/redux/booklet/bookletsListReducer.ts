import {
  getBookletsList, createNewBooklet,
  editBookletTitle, deleteBookletPermanently, deleteBooklet, restoreBooklet, emptyBookletsTrash
} from "./api";
import { ModelState, getStatus, getTypePrefix, httpRequestStatus } from "../../../../utils/httpRequest";
import { Booklet } from "../../models/booklet";
import { undoItemData } from "../general/reducers/undoActionReducer";
import { createSlice } from "@reduxjs/toolkit";
 
let bookletsListReducer = {
  undoItem: (state: any, action: any) => {
    state.data.items.splice(action.payload.index, 0, action.payload.item);
  }
};

export let bookletsListExtraReducer = (builder: any) => {
  builder.addCase(getBookletsList.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(getBookletsList.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      
      if(action.payload.pageNumber != 1)
        action.payload.items.unshift(state.data);

      state.data = action.payload;
    })
    .addCase(getBookletsList.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(createNewBooklet.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(createNewBooklet.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data.items.unshift(action.payload);
    })
    .addCase(createNewBooklet.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.payload;
    });

  //----

  builder.addCase(editBookletTitle.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(editBookletTitle.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const updatedItem = action.payload;
      const index = state.data.items.findIndex(
        (item: any) => item.id === updatedItem.id);
      if (index !== -1) state.data.items[index] = updatedItem;
    })
    .addCase(editBookletTitle.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteBooklet.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteBooklet.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteBooklet.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(restoreBooklet.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(restoreBooklet.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const restoredItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === restoredItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(restoreBooklet.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteBookletPermanently.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteBookletPermanently.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteBookletPermanently.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(emptyBookletsTrash.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(emptyBookletsTrash.fulfilled, (state: any, action: any) => {
 
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data = (ModelState.initiatePaginatedData<Booklet>()).data;
    })
    .addCase(emptyBookletsTrash.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });
};
 

var bookletsListSlice = createSlice({
  name: "booklets-list",
  initialState: ModelState.initiatePaginatedData<Booklet>(),
  reducers: bookletsListReducer,
  extraReducers: bookletsListExtraReducer
});

// export const { undoItem } = bookletsListSlice.actions;
export default bookletsListSlice;
export const { undoItem } = bookletsListSlice.actions;
import {createIndex, deleteIndex, deleteIndexPermanently, editIndexName, emptyIndicesTrash, getIndicesList, restoreIndex} from "./api";
import { ModelState, getStatus, getTypePrefix } from "../../../../utils/httpRequest";
import { Index } from "../../models";
import { createSlice } from "@reduxjs/toolkit";
 
let indicesListReducer = {
  undoItem: (state: any, action: any) => {
    state.data.items.splice(action.payload.index, 0, action.payload.item);
  }
};

export let indicesListExtraReducer = (builder: any) => {
  builder.addCase(getIndicesList.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(getIndicesList.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      
      if(action.payload.pageNumber != 1)
        action.payload.items.unshift(state.data);

      state.data = action.payload;
    })
    .addCase(getIndicesList.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(createIndex.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(createIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data.items.unshift(action.payload);
    })
    .addCase(createIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.payload;
    });

  //----

  builder.addCase(editIndexName.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(editIndexName.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const updatedItem = action.payload;
      const index = state.data.items.findIndex(
        (item: any) => item.id === updatedItem.id);
      if (index !== -1) state.data.items[index] = updatedItem;
    })
    .addCase(editIndexName.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteIndex.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(restoreIndex.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(restoreIndex.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const restoredItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === restoredItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(restoreIndex.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteIndexPermanently.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteIndexPermanently.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteIndexPermanently.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(emptyIndicesTrash.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(emptyIndicesTrash.fulfilled, (state: any, action: any) => {
 
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data = (ModelState.initiatePaginatedData<Index>()).data;
    })
    .addCase(emptyIndicesTrash.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });
};
 

var indicesListSlice = createSlice({
  name: "indices-list",
  initialState: ModelState.initiatePaginatedData<Index>(),
  reducers: indicesListReducer,
  extraReducers: indicesListExtraReducer
});

export default indicesListSlice;
export const { undoItem } = indicesListSlice.actions;
import {
  getCardsList, addCard,
  editCard, deleteCardPermanently, deleteCard, restoreCard, emptyCardsTrash
} from "./api";
import { ModelState, getStatus, getTypePrefix } from "../../../../utils/httpRequest";
import { Card } from "../../models/card";
import { createSlice } from "@reduxjs/toolkit";
 
let cardsListReducer = {
  undoItem: (state: any, action: any) => {
    state.data.items.splice(action.payload.index, 0, action.payload.item);
  }
};

export let cardsListExtraReducer = (builder: any) => {
  builder.addCase(getCardsList.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(getCardsList.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      
      if(action.payload.pageNumber != 1)
        action.payload.items.unshift(state.data);

      state.data = action.payload;
    })
    .addCase(getCardsList.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(addCard.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(addCard.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data.items.unshift(action.payload);
    })
    .addCase(addCard.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.payload;
    });

  //----

  builder.addCase(editCard.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(editCard.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const updatedItem = action.payload;
      const index = state.data.items.findIndex(
        (item: any) => item.id === updatedItem.id);
      if (index !== -1) state.data.items[index] = updatedItem;
    })
    .addCase(editCard.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteCard.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteCard.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteCard.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(restoreCard.pending, (state: any, action: any) => {
    state.typePrefix = getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(restoreCard.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const restoredItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === restoredItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(restoreCard.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(deleteCardPermanently.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(deleteCardPermanently.fulfilled, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteCardPermanently.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });

  //----

  builder.addCase(emptyCardsTrash.pending, (state: any, action: any) => {
    state.typePrefix =  getTypePrefix(action.type);
    state.status = getStatus(action.type);
  })
    .addCase(emptyCardsTrash.fulfilled, (state: any, action: any) => {
 
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.data = (ModelState.initiatePaginatedData<Card>()).data;
    })
    .addCase(emptyCardsTrash.rejected, (state: any, action: any) => {
      state.typePrefix =  getTypePrefix(action.type);
      state.status = getStatus(action.type);
      state.error = action.error;
    });
};
 

var cardsListSlice = createSlice({
  name: "cards-list",
  initialState: ModelState.initiatePaginatedData<Card>(),
  reducers: cardsListReducer,
  extraReducers: cardsListExtraReducer
});

export default cardsListSlice;
export const { undoItem } = cardsListSlice.actions;
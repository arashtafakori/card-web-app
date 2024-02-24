import {
  getBookletsList, createNewBooklet,
  editBookletTitle, deleteBooklet, archiveBooklet, restoreBooklet
} from "../api";
import { httpRequestStatus } from "../../../../../utils/httpRequest";

let bookletsListReducer = {
  add: (state: any, action: any) => {
    state.push(action.payload);
  }
};

export let bookletsListExtraReducer = (builder: any) => {
  builder.addCase(getBookletsList.pending, (state: any, action: any) => {
    state.status = httpRequestStatus.Pending;
  })
    .addCase(getBookletsList.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
      state.status = httpRequestStatus.Fullfilled;
    })
    .addCase(getBookletsList.rejected, (state: any, action: any) => {
      state.status = httpRequestStatus.Rejected;
      state.error = action.error;
    });

  //----

  builder.addCase(createNewBooklet.pending, (state: any, action: any) => {
    state.status = httpRequestStatus.Pending;
  })
    .addCase(createNewBooklet.fulfilled, (state: any, action: any) => {
      state.status = httpRequestStatus.Fullfilled;
      state.data.items.unshift(action.payload);
    })
    .addCase(createNewBooklet.rejected, (state: any, action: any) => {
      state.status = httpRequestStatus.Rejected;
      state.error = action.payload;
    });

  //----

  builder.addCase(editBookletTitle.pending, (state: any, action: any) => {
    state.status = httpRequestStatus.Pending;
  })
    .addCase(editBookletTitle.fulfilled, (state: any, action: any) => {
      state.status = httpRequestStatus.Fullfilled;
      const updatedItem = action.payload;
      const index = state.data.items.findIndex(
        (item: any) => item.id === updatedItem.id);
      if (index !== -1) state.data.items[index] = updatedItem;
    })
    .addCase(editBookletTitle.rejected, (state: any, action: any) => {
      state.status = httpRequestStatus.Rejected;
      state.error = action.error;
    });

  //----

  builder.addCase(deleteBooklet.pending, (state: any, action: any) => {
    state.status = httpRequestStatus.Pending;
  })
    .addCase(deleteBooklet.fulfilled, (state: any, action: any) => {
      state.status = httpRequestStatus.Fullfilled;
      const deletedtItemId = action.payload;
      let index = state.data.items.findIndex(
        (item: any) => item.id === deletedtItemId);
      if (index !== -1)
        state.data.items.splice(index, 1);
    })
    .addCase(deleteBooklet.rejected, (state: any, action: any) => {
      state.status = httpRequestStatus.Rejected;
      state.error = action.error;
    });
};

export default bookletsListReducer;
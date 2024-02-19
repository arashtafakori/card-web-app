import { httpRequestStatus} from '../../../../../utils/httpRequest';
import { getBookletsList } from "../api";

let bookletsListReducer = {
  add: (state: any, action: any) => {
    state.push(action.payload);
  }
};

export let bookletsListExtraReducer = (builder: any) => {
  builder
    .addCase(getBookletsList.pending, (state: any, action: any) => {
      state.data = null;
      state.status = httpRequestStatus.Pending;
      state.error = null;
    })
    .addCase(getBookletsList.fulfilled, (state: any, action: any) => {
      state.data = action.payload;
      state.status =  httpRequestStatus.Fullfilled;
      state.error = null;
    }) 
    .addCase(getBookletsList.rejected, (state: any, action: any) => {
      state.data = action.payload;
      state.status =  httpRequestStatus.Rejected;
      state.error = null;
    })
};
export default bookletsListReducer;

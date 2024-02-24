import { httpRequestStatus } from "../../../../../utils/httpRequest";
import { getBooklet } from "../api";

let bookletReducer = {
  get: (state: any, action: any) => {
 
  }
};

export let bookletExtraReducer = (builder: any) => {
  builder.addCase(getBooklet.pending, (state: any, action: any) => {
    state.data = null;
    state.status = httpRequestStatus.Pending;
    state.error = null;
  })
  .addCase(getBooklet.fulfilled, (state: any, action: any) => {
    state.data = action.payload;
    state.status =  httpRequestStatus.Fullfilled;
    state.error = null;
  }) 
  .addCase(getBooklet.rejected, (state: any, action: any) => {
    state.data = null;
    state.status =  httpRequestStatus.Rejected;
    state.error = action.error;
  });

};
export default bookletReducer;

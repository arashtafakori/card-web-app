
import {httpRequestStatus, httpState} from '../../../utils/httpRequest';

export interface Booklet {
  id: string;
  title: string;
  isDeleted: boolean;
  modifiedDate: string;
}

export const initialBooklet: httpState<Booklet> = {
  data: {
    id: '',
    title: '',
    isDeleted: false,
    modifiedDate: ''
  },
  status: httpRequestStatus.Pending,
  error: null,
  typePrefix: null
};
 
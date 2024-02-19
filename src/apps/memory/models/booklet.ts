
import {httpRequestStatus, httpState} from '../../../utils/httpRequest';

export interface Booklet {
  id: string;
  title: string;
  isArchived: boolean;
  modifiedDate: string;
}

export const initialBooklet: httpState<Booklet> = {
  data: {
    id: '',
    title: '',
    isArchived: false,
    modifiedDate: ''
  },
  status: httpRequestStatus.Pending,
  error: null
};
 
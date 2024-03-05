
import {httpRequestStatus, httpState} from '../../../utils/httpRequest';

export interface Index {
  id: string;
  name: string;
  isDeleted: boolean;
  modifiedDate: string;
}

export const initialIndex: httpState<Index> = {
  data: {
    id: '',
    name: '',
    isDeleted: false,
    modifiedDate: ''
  },
  status: httpRequestStatus.Pending,
  error: null,
  typePrefix: null
};
 
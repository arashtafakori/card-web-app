
import {httpRequestStatus, httpState} from '../../../utils/httpRequest';

export interface Card {
  id: string;
  isDeleted: boolean;
  modifiedDate: string;
  bookletId: string;
  indexId: string;
  order: number;
  expression: string;
  expressionLanguage: string;
  translation: string;
  translationLanguage: string;
}

export const initialCard: httpState<Card> = {
  data: {
    id: '',
    isDeleted: false,
    modifiedDate: '',
    bookletId: '',
    indexId: '',
    order: 0,
    expression: '',
    expressionLanguage: '',
    translation: '',
    translationLanguage: ''
  },
  status: httpRequestStatus.Pending,
  error: null,
  typePrefix: null
};
 
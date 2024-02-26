export interface Issue {
  id: string;
  description: string;
}

const issuesToMessage = (issues: Issue[]): string => {
  let message = '';
  issues.map(((issue: Issue) => { message += '\r\n' + issue.description}));
  return message;
}

export const notifyMessage = (message: string) => ({
  type: 'SHOW_NOTIFICATION',
  payload: message,
});
export const notifyError = (error: any) => ({
  type: 'SHOW_NOTIFICATION',
  payload: issuesToMessage(error.issues),
});

const initialState = {
  message: '',
};

const notificationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default notificationReducer;

export const networkError = {
  issues : [{description: 'Network error'}]
};
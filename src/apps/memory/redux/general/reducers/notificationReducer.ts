export interface Issue {
  id: string;
  description: string;
}

const issuesToMessage = (issues: Issue[]): string => {
  let message = '';
  if(issues != undefined)
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
export const closeNotification = () => ({
  type: 'CLOSE_NOTIFICATION',
  payload: null,
});

const initialState = {
  type: '',
  message: ''
};

const notificationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        type: 'SHOW_NOTIFICATION',
        message: action.payload,
      };
    case 'CLOSE_NOTIFICATION':
        return {
          ...state,
          type: 'CLOSE_NOTIFICATION',
        };
    default:
      return state;
  }
};

export default notificationReducer;

export const networkError = {
  issues : [{description: 'Network error'}]
};
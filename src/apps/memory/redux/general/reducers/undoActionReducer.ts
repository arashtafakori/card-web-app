export interface undoItemData {
  index: number | null;
  data: any | null;
}

export interface undoAction {
  type?: string,
  description: string;
  onUndo: any;
}

export const showUndoAction = (payload: undoAction) => ({
  type: 'SHOW_UNDO_ACTION',
  payload: payload,
});
export const closeUndoAction = () => ({
  type: 'CLOSE_UNDO_ACTION',
  payload: null,
});

const initialState: undoAction = {
  type: '',
  description: '',
  onUndo: null
};


const undoActionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SHOW_UNDO_ACTION':
      return {
        ...state,
        type: 'SHOW_UNDO_ACTION',
        payload: action.payload,
      };
    case 'CLOSE_UNDO_ACTION':
      return {
        ...state,
        type: 'CLOSE_UNDO_ACTION',
      };
    default:
      return state;
  }
};

export default undoActionReducer;


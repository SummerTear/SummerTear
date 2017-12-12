export function createReducer(defaultState, handlers) {
  return (state = defaultState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

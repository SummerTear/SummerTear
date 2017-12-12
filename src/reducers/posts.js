import { createReducer } from 'utils';
import types from 'constants/ActionTypes';

const initialState = { posts: [] };

export default createReducer(initialState, {
  [types.GET_POSTS_SUCCESS](state, action) {
    return { ...state, posts: action.posts };
  },
  [types.GET_POSTS_FAILURE](state) {
    return state;
  }
});

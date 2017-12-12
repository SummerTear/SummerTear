import types from 'constants/ActionTypes';

export function getPosts() {
  return {
    type: types.GET_POSTS
  };
}

export function getPostsSuccess(posts) {
  return {
    type: types.GET_POSTS_SUCCESS,
    posts
  };
}

export function getPostsFailure() {
  return {
    type: types.GET_POSTS_FAILURE
  };
}

/* eslint-disable import/no-anonymous-default-export */
import {
  FETCH_ALL,
  FETCH_POST_BY_SEARCH,
  FETCH_POST,
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
  COMMENT,
  START_LOADING,
  END_LOADING,
} from '.././constants/actionTypes';

export default (state = { isLoading: false, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case END_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.posts,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload ? action.payload : post
        ),
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

// Actions Creators
export const signIn = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data: data });
    history.push('/');
  } catch (error) {
    console.log(error.response);
  }
};
export const signUp = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data: data });
    history.push('/');
  } catch (error) {
    console.log(error.response);
  }
};

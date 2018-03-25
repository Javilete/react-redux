import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors() {
  return dispatch => {
    // body of thunk
      dispatch(beginAjaxCall());
      return authorApi.getAllAuthors().then(authors => {
          dispatch(loadAuthorsSuccess(authors));
      }).catch(error => {
          throw(error);
      });
  };
}

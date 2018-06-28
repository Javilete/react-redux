import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall } from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function deleteAuthorSuccess(author) {
  return {type: types.DELETE_AUTHOR_SUCCESS, author};
}

export function createAuthorSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
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

export function deleteAuthor(author) {
  return dispatch => {
    // body of thunk
    dispatch(beginAjaxCall());
    return authorApi.deleteAuthor(author.id).then( author => {
      dispatch(deleteAuthorSuccess(author));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return authorApi.saveAuthor(author).then( author => {
      dispatch(createAuthorSuccess(author));
    }).catch(error => {
      throw(error);
    });
  };
}

import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {

  function loadAuthorsActions() {
    return action.authors;
  }

  function createAuthorAction() {
    return [...state,
      Object.assign({}, action.author)
    ];
  }

  function deleteAuthorAction() {
    console.log("State: " + JSON.stringify(state) ) ;
    return [
      ...state.filter(author => author.id !== action.author.id)
    ];
  }

  let actions = new Map();
  actions.set(types.LOAD_AUTHORS_SUCCESS, loadAuthorsActions);
  actions.set(types.CREATE_AUTHOR_SUCCESS, createAuthorAction);
  actions.set(types.DELETE_AUTHOR_SUCCESS, deleteAuthorAction);

  let act = actions.get(action.type);
  return act ? act() : state;
}

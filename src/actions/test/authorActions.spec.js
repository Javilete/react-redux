import expect from 'expect';
import * as authorActions from '../authorActions';
import * as types from '../actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock'; //Mock API calls
import configureMockStore from 'redux-mock-store';

describe('Author actions', () => {
  describe('deleteAuthorSuccess', () => {
    const author = {id: 'pepito-grillo', firstName: 'pepito', lastName: 'grillo'};
    const expectedAction = {
      type: types.DELETE_AUTHOR_SUCCESS,
      author: author
    };

    const action = authorActions.deleteAuthorSuccess(author);

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
    //An example call to nock and how to replay when it is captured, not needed as in our app we
    // do not use reall API calls
    // nock('http://example')
    //   .get('/authors')
    //   .reply(200, { body: {author: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL},
      { type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{id: 'pepito-grillo', firstName: 'pepito', lastName: 'grillo'}]}}
    ];
    const store = mockStore({authors: []}, expectedActions);

    store.dispatch(authorActions.loadAuthors()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
      done(); //Tells mock we are done with the test
    });
  });

  it('should create BEGIN_AJAX_CALL and DELETE_AUTHO_SUCCESS when deleting an author', (done) => {

    const author = {id: 'pepito-grillo', firstName: 'pepito', lastName: 'grillo'};
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL},
      { type: types.DELETE_AUTHOR_SUCCESS, body: {author: author}}
    ];
    const store = mockStore({authors: []}, expectedActions);

    store.dispatch(authorActions.deleteAuthor(author)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.DELETE_AUTHOR_SUCCESS);
      done(); //Tells mock we are done with the test
    });
  });
});

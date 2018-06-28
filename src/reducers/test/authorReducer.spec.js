import expect from 'expect';
import authorReducer from '../authorReducer';
import * as actions from '../../actions/authorActions';

describe('Author Reducer', () =>  {
  it('should add an author when passed CREATE_AUTHOR_SUCCESS', () => {
    const initialState = [
      {firstName: 'Pepe', lastName: 'Grillo'}
    ];
    const newAuthor = {firstName: 'Juan', lastName: 'Hernandez'};
    const action = actions.createAuthorSuccess(newAuthor);

    const newState = authorReducer(initialState, action);

    expect(newState.length).toEqual(2);
    expect(newState[0].firstName).toEqual('Pepe');
    expect(newState[1].firstName).toEqual('Juan');
  });
});

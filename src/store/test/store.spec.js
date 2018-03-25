import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import initialState from '../../reducers/initialState';
import * as courseActions from '../../actions/courseActions';

describe('Store', () => {
  it('should handle creating courses', () => {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean Code'
    };

    //act
    const createAction = courseActions.createCourseSuccess(course);
    store.dispatch(createAction);

    //assert
    const actual = store.getState().courses[0];
    expect(actual).toEqual({title: 'Clean Code'});
  });

  it('should handle updating courses', () => {
    //arrange
    const course = {
      id: 0, title: 'Clean Code'
    };
    initialState.courses.push(course);
    const store = createStore(rootReducer, initialState);

    //act
    const updatedCourse = {id: 0, title: 'TDD by example'};
    const updateAction = courseActions.updateCourseSuccess(updatedCourse);
    store.dispatch(updateAction);

    //assert
    const actual = store.getState().courses[0];
    expect(actual).toEqual(updatedCourse);
  });

  it('should handle deleting courses', () => {
    //arrange
    const course = [
      {id: 0, title: 'Clean Code'},
      {id: 1, title: 'Working with Legacy Code'}];
    initialState.courses.push(course);
    const store = createStore(rootReducer, initialState);

    //act
    const deletedCourse = {id: 0, title: 'Clean Code'};
    const deleteAction = courseActions.deleteCourseSuccess(deletedCourse);
    store.dispatch(deleteAction);

    //assert
    expect(store.getState().courses.length).toEqual(1);
  });
});

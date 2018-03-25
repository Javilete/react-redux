import expect from 'expect';
import courseReducer from '../courseReducer';
import * as actions from '../../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ];
    const newCourse = {title: 'C'};
    const action = actions.createCourseSuccess(newCourse);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'}
    ];
    const course = {id:'B', title: 'New Title'};
    const action = actions.updateCourseSuccess(course);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    const udpatedCourse = newState.find(a => a.id == course.id);
    expect(udpatedCourse.title).toEqual('New Title');
    expect(newState.length).toEqual(2);
  });

  it('should delete course when passed DELETE_COURSE_SUCCESS', () => {
    // arrange
    const initialState = [
      {id: 'A', title: 'A'},
      {id: 'B', title: 'B'},
      {id: 'C', title: 'C'}
    ];
    const course = {id:'B', title: 'B'};
    const action = actions.deleteCourseSuccess(course);

    //act
    const newState = courseReducer(initialState, action);

    //assert
    expect(newState.length).toEqual(2);
    expect(newState[0]).toEqual({id: 'A', title: 'A'});
    expect(newState[1]).toEqual({id: 'C', title: 'C'});
  });

});

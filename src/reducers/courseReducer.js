import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {

  function createCourseAction() {
    return [...state,
      Object.assign({}, action.course)
    ];
  }

  function updateCourseAction() {
    return [
      ...state.filter(course => course.id !== action.course.id),
      Object.assign({}, action.course)
    ];
  }

  function loadCoursesActions() {
    return action.courses;
  }

  function deleteCourseAction() {
    return [
      ...state.filter(course => course.id !== action.course.id)
    ];
  }

  let actions = new Map();
  actions.set(types.CREATE_COURSE_SUCCESS, createCourseAction);
  actions.set(types.UPDATE_COURSE_SUCCESS, updateCourseAction);
  actions.set(types.DELETE_COURSE_SUCCESS, deleteCourseAction);
  actions.set(types.LOAD_COURSES_SUCCESS, loadCoursesActions);

  let act = actions.get(action.type);
  return act ? act() : state;
}

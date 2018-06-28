import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall , ajaxCallFailed } from './ajaxStatusActions';

//type property is required
export function createCourseSuccess(course) {
  return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
  return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function deleteCourseSuccess(course) {
  return {type: types.DELETE_COURSE_SUCCESS, course};
}

//thunk dispatching loadCoursesSuccess
export function loadCourses() {
  return dispatch => {
    // body of thunk
      dispatch(beginAjaxCall());
      return courseApi.getAllCourses().then(courses => {
          dispatch(loadCoursesSuccess(courses));
      }).catch(error => {
          throw(error);
      });
  };
}

//thunk dispatching updateCourseSuccess
export function saveCourse(course) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course).then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    }).catch(error => {
      dispatch(ajaxCallFailed(error));
      throw(error);
    });
  };
}

//thunk dispatching deleteCourseSuccess
export function deleteCourse(course) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return courseApi.deleteCourse(course.id).then(deletedCourse => {
      dispatch(deleteCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallFailed(error));
      throw(error);
    });
  };
}

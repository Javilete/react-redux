//Example of component unit test with React Utils
import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import { CoursesPage } from '../CoursesPage';
import CourseList from '../CourseList';

describe('when the list of courses is empty', () => {
  it('should hide the Course Page', () => {
    const props = {
      courses: []
    };

    const wrapper = shallow(<CoursesPage {...props}/>); // Use mount so the full DOM is created in memory (with deep components)
    const table = wrapper.find(CourseList);
    expect(table.length).toBe(0);
  });
});

describe('when the list of courses contains at least one', () => {
  it('should display them', () => {
    const props = {
      courses: [{id: 'A', watchHref: '', title: 'A-Title', authorId: 'author', length: '10:00', category: 'Cat'}]
    };

    const wrapper = shallow(<CoursesPage {...props}/>); // Use mount so the full DOM is created in memory (with deep components)
    const table = wrapper.find(CourseList);
    expect(table.length).toBe(1);
  });
});

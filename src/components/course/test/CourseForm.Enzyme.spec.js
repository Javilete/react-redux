//Example of component unit test with React Utils
import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from '../CourseForm';

//Function to return the output of rendering the component we are testing
function setUp(saving) {
  let props = {
    course: {},
    saving: saving,
    errors: {},
    allAuthors: [],
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);// Spread operator on object
}

describe('CourseForm via Enzyme', () => {
  it('renders form and h1', () => {
      const wrapper = setUp(false);
      expect(wrapper.find('form').length).toBe(1);
      expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setUp(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when not ', () => {
    const wrapper = setUp(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});

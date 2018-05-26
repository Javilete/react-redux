//Example of component unit test with React Utils
import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import { AuthorsPage } from '../AuthorsPage';
import AuthorList from '../AuthorList';

describe('when the list of authors is empty', () => {
  it('should hide the Author Page', () => {
    const props = {
      authors: []
    };

    const wrapper = shallow(<AuthorsPage {...props}/>); // Use mount so the full DOM is created in memory (with deep components)
    const table = wrapper.find(AuthorList);
    expect(table.length).toBe(0);
  });
});

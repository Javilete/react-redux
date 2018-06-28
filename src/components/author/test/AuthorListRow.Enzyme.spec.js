//Example of component unit test with React Utils
import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import { AuthorListRow } from '../AuthorListRow'; // Import the unconnected version of the component using {}

describe('Author list row', () => {

  describe('when an author is passed', () => {
    it('should be displayed', () => {
      const props = {
        author: {id: 'pepito-grillo', firstName: 'Pepito', lastName: 'Grillo'}
      };

      const wrapper = shallow(<AuthorListRow {...props} />); // Use mount so the full DOM is created in memory (with deep components)
      const fullName = wrapper.find('td').last().text();
      expect(fullName).toBe('Pepito Grillo');
    });
  });
});

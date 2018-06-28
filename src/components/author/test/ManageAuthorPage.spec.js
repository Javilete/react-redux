import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import { ManageAuthorPage } from '../ManageAuthorPage'; // {} to get the raw component

describe('Manage Author page', () => {
  it('sets error message when trying to save empty lastname', () => {
    const props = {
      actions: {
        saveAuthor: () => {
          return Promise.resolve();
        }
      },
      author: {id: '', firstName: '', lastName: ''}
    };

    const wrapper = mount(<ManageAuthorPage {...props}/>); // Use mount so the full DOM is created in memory (with deep components)
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.lastName).toBe('Last name must be at least 3 characters');
  });


});

import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import { ManageAuthorPage } from '../ManageAuthorPage';// {} to get the raw component

describe('Manage Author page', () => {
  it('sets error message when trying to save empty surname', () => {
    const props = {
      actions: { saveAuthor: () => { return Promise.resolve(); }},
      author: {id: '', firstname: '', surname: ''}
    };

    const wrapper = mount(<ManageAuthorPage {...props}/>); // Use mount so the full DOM is created in memory (with deep components)
    const saveButton = wrapper.find('input').last();
    expect(saveButton.prop('type')).toBe('submit');
    saveButton.simulate('click');
    expect(wrapper.state().errors.surname).toBe('Surname must be at least 5 characters');
  });
});

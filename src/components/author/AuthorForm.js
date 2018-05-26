import React, { PropTypes } from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>Add an author</h1>

      <TextInput
        name="firstname"
        label="First Name"
        value={author.firstname}
        onChange={onChange}
        error={errors.firstname} />

      <TextInput
        name="surname"
        label="Surname"
        value={author.surname}
        onChange={onChange}
        error={errors.surname} />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />

    </form>

  );
};

AuthorForm.propTypes = {

};

export default AuthorForm;

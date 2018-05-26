import React, { PropTypes } from 'react';


export default class ManageCoursePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      authors: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };
  }

  render () {
    return (
      <AuthorForm
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors}
        saving={this.state.saving}
        />
    )
  }
}

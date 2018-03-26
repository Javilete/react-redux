import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import { connect } from 'react-redux';
import toastr from 'toastr';

// const CourseListRow = ({course}) => {
export class CourseListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.actions.deleteCourse(this.props.course)
      .then(() => this.redirect(),(error) => this.handleError(error));
  }

  redirect() {
    toastr.success('Course deleted');
  }

  handleError(error) {
    toastr.error(error);
  }

  render() {
    const {course} = this.props;

    return (
      <tr>
        <td><a href="javascript:;" onClick={this.deleteCourse}>Delete</a> / <a href={course.watchHref} target="_blank">Watch</a></td>
        <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
        <td>{course.length}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  console.log('Dispatch to props');
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(CourseListRow);

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {CoursesPage} from "../course/CoursesPage";

export class AuthorsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  render() {
    const {authors} = this.props;

    return (
      <div>
        <h1>Authors</h1>
        <input type="submit"
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthorPage} />
        {authors.length > 0 ? <AuthorList authors={authors}/> : ''}
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // createAuthor: author => dispatch(authorActions.createAuthor(author))
    actions: bindActionCreators(authorActions, dispatch) //Go through actions and wrap them in a call dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);

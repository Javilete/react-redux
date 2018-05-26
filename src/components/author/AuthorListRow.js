import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authorActions from "../../actions/authorActions";
import toastr from "toastr";


export class AuthorListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  deleteAuthor(event) {
    event.preventDefault();
    console.log(this.props);
    this.props.actions.deleteAuthor(this.props.author)
      .then(() => this.redirect(),(error) => this.handleError(error));
  }

  redirect() {
    toastr.success('Author deleted');
  }

  handleError(error) {
    toastr.error(error);
  }

  render() {
    const {author} = this.props;

    return (
      <tr>
        <td><a href="javascript:;" onClick={this.deleteAuthor}>Delete</a></td>
        <td>{author.firstname} {author.surname}</td>
      </tr>
    );
  }
}

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  console.log('Dispatch to props');
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AuthorListRow);

import React, {PropTypes} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authorActions from "../../actions/authorActions";
import toastr from "toastr";
import {validate} from "../../validators/validators";
import {AuthorForm} from "./AuthorForm";
import {ManageCoursePage} from "../course/ManageCoursePage";

export class ManageAuthorPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthor = this.updateAuthor.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  updateAuthor(event) {
    const field = event.target.name;
    let author = this.state.author;
    author[field] = event.target.value;
    return this.setState({author: author});
  }

  authorFormIsValid() {
    let errors = validate(this.state.author);
    if (Object.keys(errors).length != 0) {
      this.setState({errors: errors});
      return false;
    }

    return true;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect(), (error) => this.handleError(error));
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Author saved');
    this.context.router.push('/authors');
  }

  handleError(error) {
    this.setState({saving: false});
    toastr.error(error);
  }

  render() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.updateAuthor}
        onSave={this.saveAuthor}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    )
  }
}

ManageAuthorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  author: PropTypes.array.isRequired
};

//Pull in the react router context so we can use router and it is available as this.context.router.
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getAuthorBy(authors, id) {
  const author = authors.filter(author => author.id == id);
  if (author) return author[0]; //Filter returns an array and it returns the first one.
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id; //from the path `author/:id`

  //Empty author for initialization (core structure)
  let author = {id: '', firstname: '', surname: ''};

  if (authorId && state.authors.length > 0) {
    author = getAuthorBy(state.authors, authorId);
  }

  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // authorActions will be available under this.props.actions
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);

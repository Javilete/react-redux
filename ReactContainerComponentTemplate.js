import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class $COMPONENT_NAME extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (

    );
  }
}

$COMPONENT_NAME.PropTypes = {

}

function mapStateToProps(state, ownProps) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)($COMPONENT_NAME);

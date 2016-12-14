import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as action from '../action/action';
import App from '../components/App.jsx';
import NAME from '../NAME';

function mapStateToProps(state) {
  window.localStorage.setItem(NAME, JSON.stringify(state));
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...action }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
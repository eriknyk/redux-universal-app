import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

// function mapStateToProps(state) {
//   return {
//     counter: state.counter
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(CounterActions, dispatch)
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Counter)

import React, { Component, PropTypes } from 'react';

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>App</h1>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

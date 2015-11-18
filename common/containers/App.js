import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
  render () {
    return (
      <div>
        <h1>Redux Universal App</h1>

        <section>
          <Link to="/home">Home</Link>
          { ' - ' }
          <Link to="/about">About</Link>
          { ' - ' }
          <Link to="/counter">Counter</Link>
        </section>
        <br />
        <section>
          {this.props.children}
        </section>
      </div>
    );
  }
}

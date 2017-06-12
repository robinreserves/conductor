import React, { Component } from 'react';
import withRedux from 'next-redux-wrapper';
import { getInitialProps, makeStore } from '../app/initial-state';

import Header from '../components/Header';

class Index extends Component {
  static getInitialProps(props) {
    return getInitialProps(props);
  }

  render() {
    return (
      <div>
        <Header />
        <p>This is the about page.</p>
      </div>
    );
  }
}

export default withRedux(makeStore)(Index);

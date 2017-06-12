import React, { Component } from 'react';
import { withRedux } from 'next-redux-wrapper';
import { getInitialProps, makeStore } from '../app/initial-state';

import Header from '../components/Header';
import ServiceList from '../components/ServiceList';

class Index extends Component {
  static getInitialProps(props) {
    return getInitialProps(props);
  }

  render() {
    return (
      <div>
        <Header />
        <ServiceList />
        <p>Hello Next.js</p>
      </div>
    );
  }
}

export default withRedux(makeStore)(Index);

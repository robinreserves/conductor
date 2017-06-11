import React from 'react';
import Header from '../components/Header';
import ServiceList from '../components/ServiceList';
import { getConfig } from '../app/config';

const Index = () => (
  <div>
    <Header />
    <ServiceList />
    <p>Hello Next.js</p>
  </div>
);

// TODO change this into next-redux-wrapper
Index.getInitialProps = async () => {
  const config = getConfig();
  return { config };
};

export default Index;

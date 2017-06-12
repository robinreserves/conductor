import { createStore } from 'redux';
import { getConfig } from './config';
import { loadServices } from '../actions';
import reducer from '../reducers';

const makeStore = initialState =>
  createStore(reducer, initialState);

const getInitialProps = ({ store, isServer, pathname, query }) => {
  if (!isServer) {
    console.log('FATAL: cannot getInitialProps on client');
  }
  const config = getConfig();
  const initialState = Object.keys(config).map(name => ({
    name,
    exec: config[name].exec, // i.e. everything in the exec YAML
    currentExector: 0,
    running: false,
    needsRestart: false,
    startedAt: null,
  }));
  store.dispatch(loadServices(initialState));
};

module.exports = {
  makeStore,
  getInitialProps,
};

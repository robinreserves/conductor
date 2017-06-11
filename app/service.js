import { loadConfig } from './config';
import * as executors from './exec';
import _ from 'lodash';

class Service {

  constructor(descriptor) {
    // TODO parse env and store
    // TODO replace exec items with instantiated executors

    this.exec = descriptor.exec.map((exec) => {
      if (!executors[exec.type]) {
        console.error(`FATAL: unknown executor type ${exec.type}`)
        process.exit(2);
      }
      return executors({
        ...exec,
        
      });
    });
      
  }

};

// singleton configuration
// Services are the 
let services = null;
let env = null;

const createServices = config =>
  _.mapValues(config, descriptor =>
    new Service(descriptor));

const getServices = () => {
  if (!services) {
    const config = loadConfig();
    services = createServices(config);
  }
  return services;
};

module.exports = {
  getServices,
};

import _ from 'lodash';
import fs from 'fs';
import opn from 'opn';
import { parse } from 'env-file-parser';
import { getConfig } from './config';
import * as executors from './exec';

class Service {

  constructor(descriptor, stdout, stderr, resolvePath) {
    // watch/parse env and store
    this.env = {};
    if (descriptor.env) {
      this.envPath = resolvePath(descriptor.env);
      this.reloadEnv();
      fs.watch(resolvePath(this.envPath), (eventType) => {
        if (eventType === 'change') {
          this.reloadEnv();
        } else {
          console.info(`Unhandled ${eventType} on ${this.envPath}`);
        }
      });
    }

    // replace exec items with instantiated executors
    this.exec = descriptor.exec.map((exec) => {
      if (!executors[exec.type]) {
        console.error(`FATAL: unknown executor type ${exec.type}`);
        process.exit(2);
      }
      return executors({
        ...exec,
      }, {
        resolvePath,
        getEnvironment: () => this.env,
        getStdout: () => stdout,
        getStderr: () => stderr,
      });
    });
  }

  reloadEnv() {
    if (!this.envPath) return;
    parse(this.envPath).then((env) => {
      this.env = env;
    });
  }

  // uses the system-default text editor
  // to edit this Service's environment variables file.
  editEnv() {
    if (!this.envPath) return Promise.reject('No env file for this Service.');
    return opn(this.envPath);
  }

}

// singleton configuration
// Services are the backend state ("implementation").
let services = null;

const createServices = config =>
  _.mapValues(config, descriptor =>
    new Service(descriptor));

const getServices = () => {
  if (!services) {
    const config = getConfig();
    services = createServices(config);
  }
  return services;
};

module.exports = {
  getServices,
};

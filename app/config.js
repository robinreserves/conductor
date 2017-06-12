import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

// singleton configuration
// A config is an immutable descripton of microservices we want to orchestrate.
let config = null;
let basedir = null;

const loadConfig = () => {
  /*
  if (process.argv.length !== 2) {
    console.error(`Usage: ${process.argv0} path/to/config.yaml`);
    process.exit(1);
  }
  */
  const configPath = './example-config/robin.yaml';
  basedir = path.basename(configPath);
  config = yaml.safeLoad(fs.readFileSync(configPath, 'utf8'));
};

const getConfig = () => {
  if (!config) {
    loadConfig();
  }
  return config;
};

const resolvePath = (relativePath) => {
  if (!basedir) {
    loadConfig();
  }
  return path.resolve(basedir, relativePath);
};

module.exports = {
  getConfig,
  resolvePath,
};

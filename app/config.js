// singleton configuration
// A config is an immutable descripton of microservices we want to orchestrate.
let config = null;

const loadConfig = () => {
  // TODO process command-line args
  // TODO parse YAML
  // TODO set config basedir
  // TODO return
};

const getConfig = () => {
  if (!config) {
    config = loadConfig();
  }
  return config;
};

module.exports = {
  getConfig,
};

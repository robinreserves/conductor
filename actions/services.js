const loadServices = services => ({
  type: 'loadServices',
  initialState: services,
});

const startService = (name, startedAt) => ({
  type: 'startService',
  name,
  startedAt,
});

const stopService = name => ({
  name,
});

const switchExecutor = (name, index) => ({
  name,
  index,
});

const toggleStdout = (name, enabled) => ({
  name,
  enabled,
});

const toggleSterr = (name, enabled) => ({
  name,
  enabled,
});

module.exports = {
  loadServices,
  startService,
  stopService,
  switchExecutor,
  toggleStdout,
  toggleSterr,
};

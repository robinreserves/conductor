import Docker from 'dockerode';

const docker = new Docker();

export default ({ image, expose }, { getEnvironment, getStdout, getStderr }) => {
  let id = null;

  const getEnvironmentArray = () => {
    const env = getEnvironment();
    return Object.keys(env).map(key => `${key}=${env[key]}`);
  };

  const stop = () => (containerName ? docker.getContainer(id).remove() : Promise.resolve());
  const start = () => (containerName ? Promise.reject("Already running!") : docker.run(
    image, null, [getStdout(), getStderr()], {
      Tty: false,
      env: getEnvironmentArray(),
      expose,
    }))
      .then(container => container.inspect('.Name').then(name => {
        id = name;
      }))

  return {
    exitCode: async () => await docker.getContainer(id).inspect('.ErrorCode'),
    running: async () => id != null && await docker.getContainer(id).isRunning(),
    startedAt: async () => await docker.getContainer(id).inspect('.StartedAt'),

    stop,
    start,
    restart: () => stop().then(start),
  };
};

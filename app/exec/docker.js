import Docker from 'dockerode';

const docker = new Docker();

export default ({ image, expose }, { getEnvironment, getStdout, getStderr }) => {
  let id = null;

  const getEnvironmentArray = () => {
    const env = getEnvironment();
    return Object.keys(env).map(key => `${key}=${env[key]}`);
  };

  const stop = () => (id ? docker.getContainer(id).remove() : Promise.resolve());
  const start = () => (id ? Promise.reject('Already running!') : docker.run(
    image, null, [getStdout(), getStderr()], {
      Tty: false,
      env: getEnvironmentArray(),
      expose,
    }))
      .then(container => container.inspect('.Name').then((name) => {
        id = name;
      }));

  return {
    exitCode: () => docker.getContainer(id).inspect('.ErrorCode'),
    running: () => (id != null ? docker.getContainer(id).isRunning() : Promise.resolve(false)),
    startedAt: () => docker.getContainer(id).inspect('.StartedAt'),

    stop,
    start,
  };
};

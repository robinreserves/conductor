import docker from './docker';
import shell from './shell';

/**
  Your exec(utor) implementation must be a function,
  returning an object that implements the following methods:

    - running: () => bool
    - startedAt: () => int (epoch milliseconds)
    - exitCode: () => int
    - stop: () => undefined | Promise
    - start: () => undefined | Promise

  All YAML properties other than "type" are passed as props;
  e.g. if you have the following in your `exec` section:

    - type: docker
      image: robin-communicator:0.7.0
      expose:
        - 1339:1339

  Your executor function will be called with these arguments:

    executor({
      "image": "robin-communicator:0.7.0",
      "expose": [ "1339:1339" ],
    },
    {
      "getEnvironment": () => { ... },
      "resolvePath": (path) => "...",
      "getStdout": () => stream,
      "getStderr": () => stream,
    });

  Notice that we also pass a few extra functions for you:

    - getEnvironment: () => a current mapping of environment variables to values for this service.
    - resolvePath: (path) => resolves a path to be relative to the config file's base directory.
    - getStdout: () => returns a reference to the combined stdout stream.
    - getStderr: () => returns a reference to the combined stderr stream.

*/
module.exports = {
  docker,
  shell,
};

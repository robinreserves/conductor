import { spawn } from 'child_process';
import moment from 'moment';

export default ({ command, workdir }, { getEnvironment, resolvePath, getStdout, getStderr }) => {
  let startedAt = null;
  let exitCode = null;
  let subprocess = null;

  const args = command.split(' ');

  const start = () => {
    if (!subprocess) {
      startedAt = +moment();
      subprocess = spawn(args[0], args.slice(1), {
        cwd: resolvePath(workdir),
        stdio: ['ignore', getStdout(), getStderr()],
        env: getEnvironment(),
      });
      subprocess.on('close', (code) => {
        exitCode = code;
        subprocess = null;
      });
    }
    return Promise.resolve();
  };

  const stop = () => {
    if (subprocess) {
      subprocess.kill('SIGTERM'); // allows graceful shutdown
    } 
    return Promise.resolve();
  };

  return {
    running: () => !!subprocess,
    exitCode: () => exitCode,
    startedAt: () => startedAt,
    start,
    stop,
    restart: () => stop().then(start),
  };
};

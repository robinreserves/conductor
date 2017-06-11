const INITIAL_STATE = {};

export default function services(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'start': /* { name, startedAt } */
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          running: true,
          startedAt: action.startedAt,
        },
      };

    case 'stop': /* { name } */
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          running: false,
          requiresRestart: false,
        },
      };

    case 'switchExecutor': /* { name, index } */
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          executorIndex: action.index,
          requiresRestart: action.index !== state[action.name].executorIndex,
        },
      };

    case 'toggleStdout': /* { name, enabled } */
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          stdout: action.enabled,
        },
      };

    case 'toggleStderr': /* { name, enabled } */
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          stderr: action.enabled,
        },
      };

    default:
      return state;
  }
}

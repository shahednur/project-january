//@flow

import detect from 'detect-port';
import getProcessForPort from 'react-dev-utils/getProcessForPort';
import prompt from 'react-dev-utils/prompt';
import clearConsole from 'react-dev-utils/clearConsole';
import chalk from 'chalk';

const DEFAULT_PORT = process.env.PORT || 3000;

export default (run: Function, { isInteractive }: { isInteractive: boolean }) =>
  async () => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `detect()` Promise resolves to the next free port.
    const port = await detect(DEFAULT_PORT);
    if (port === DEFAULT_PORT) {
      run(port);
      return;
    }

    if (isInteractive) {
      clearConsole();
      const existingProcess = getProcessForPort(DEFAULT_PORT);
      const question = chalk.yellow(
        'Something is already running on port ' +
          DEFAULT_PORT +
          '.' +
          (existingProcess ? ' Probably:\n  ' + existingProcess : '')
      ) +
        '\n\nWould you like to run the app on another port instead?';

      const shouldChangePort = await prompt(question, true);

      if (shouldChangePort) {
        run(port);
      }
    } else {
      console.log(
        chalk.red('Something is already running on port ' + DEFAULT_PORT + '.')
      );
    }
  };

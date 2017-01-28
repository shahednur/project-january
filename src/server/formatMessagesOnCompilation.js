//@flow

import chalk from 'chalk';
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages';
import pathExists from 'path-exists';
import paths from '../../config/paths';
const useYarn = pathExists.sync(paths.yarnLockFile);
const cli = useYarn ? 'yarn' : 'npm';

type Stats = { toJson(a: Object, b: boolean): Array<string> };

export default (
  {
    state,
    protocol,
    host,
    port,
    isInteractive,
    clearConsole
  }: {
    state: { isFirstCompile: boolean },
    protocol: string,
    host: string,
    port: string,
    isInteractive: boolean,
    clearConsole: Function
  }
) =>
  (stats: Stats) => {
    if (isInteractive) {
      clearConsole();
    }

    // We have switched off the default Webpack output in WebpackDevServer
    // options so we are going to "massage" the warnings and errors and present
    // them in a readable focused way.
    const messages = formatWebpackMessages(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const showInstructions = isSuccessful &&
      (isInteractive || state.isFirstCompile);

    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully!'));
    }

    if (showInstructions) {
      console.log();
      console.log('The app is running at:');
      console.log();
      console.log(
        '  ' + chalk.cyan(protocol + '://' + host + ':' + port + '/')
      );
      console.log();
      console.log('Note that the development build is not optimized.');
      console.log(
        'To create a production build, use ' +
          chalk.cyan(cli + ' run build') +
          '.'
      );
      console.log();
      state.isFirstCompile = false;
    }

    // If errors exist, only show errors.
    if (messages.errors.length) {
      console.log(chalk.red('Failed to compile.'));
      console.log();
      messages.errors.forEach(message => {
        console.log(message);
        console.log();
      });
      throw Error('Failed to compile.');
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.'));
      console.log();
      messages.warnings.forEach(message => {
        console.log(message);
        console.log();
      });
      // Teach some ESLint tricks.
      console.log('You may use special comments to disable some warnings.');
      console.log(
        'Use ' +
          chalk.yellow('// eslint-disable-next-line') +
          ' to ignore the next line.'
      );
      console.log(
        'Use ' +
          chalk.yellow('/* eslint-disable */') +
          ' to ignore all warnings in a file.'
      );
    }
  };

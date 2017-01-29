//@flow

process.env.NODE_ENV = 'development';

// Load environment constiables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment constiables
// that have already been set.
// https://github.com/motdotla/dotenv
import dotenv from 'dotenv';
dotenv.config({ silent: true });

import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import historyApiFallback from 'connect-history-api-fallback';
import httpProxyMiddleware from 'http-proxy-middleware';
import clearConsole from 'react-dev-utils/clearConsole';
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles';

import openBrowser from 'react-dev-utils/openBrowser';

import config from '../../config/webpack.config.dev';
import paths from '../../config/paths';
import formatMessagesOnCompilation from './formatMessagesOnCompilation';
import wrapMaybeChangePort from './wrapMaybeChangePort';

//$FlowIssue
const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
if (!checkRequiredFiles([ paths.appHtml, paths.appIndexJs ])) {
  process.exit(1);
}

const setupCompiler = (host, port, protocol) => {
  const handleCompile = () => {
  };
  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  const compiler = webpack(config, handleCompile);

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle. WebpackDevServer takes care to pause serving the
  // bundle, so if you refresh, it'll wait instead of serving the old one.
  // "invalid" is short for "bundle invalidated", it doesn't imply any errors.
  compiler.plugin('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  let state = { isFirstCompile: true };

  // "done" event fires when Webpack has finished recompiling the bundle.
  // Whether or not you have warnings or errors, you will get this event.
  compiler.plugin(
    'done',
    formatMessagesOnCompilation({
      state,
      protocol,
      host,
      port,
      isInteractive,
      clearConsole
    })
  );
  return compiler;
};

const addMiddleware = devServer => {
  // We need to provide a custom onError function for httpProxyMiddleware.
  // It allows us to log custom error messages on the console.
  const onProxyError = proxy => (err, req, res) => {
    const host = req.headers && req.headers.host;
    console.log(
      chalk.red('Proxy error:') +
        ' Could not proxy request ' +
        chalk.cyan(req.url) +
        ' from ' +
        chalk.cyan(host) +
        ' to ' +
        chalk.cyan(proxy) +
        '.'
    );
    console.log(
      'See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (' +
        chalk.cyan(err.code) +
        ').'
    );
    console.log();

    // And immediately send the proper error response to the client.
    // Otherwise, the request will eventually timeout with ERR_EMPTY_RESPONSE on the client side.
    if (res.writeHead && !res.headersSent) {
      res.writeHead(500);
    }
    res.end(
      'Proxy error: Could not proxy request ' +
        req.url +
        ' from ' +
        host +
        ' to ' +
        proxy +
        ' (' +
        err.code +
        ').'
    );
  };

  // `proxy` lets you to specify a fallback server during development.
  // Every unrecognized request will be forwarded to it.
  //$FlowIssue
  const proxy = require(paths.appPackageJson).proxy;
  devServer.use(
    historyApiFallback({
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
      // For single page apps, we generally want to fallback to /index.html.
      // However we also want to respect `proxy` for API calls.
      // So if `proxy` is specified, we need to decide which fallback to use.
      // We use a heuristic: if request `accept`s text/html, we pick /index.html.
      // Modern browsers include text/html into `accept` header when navigating.
      // However API calls like `fetch()` won’t generally accept text/html.
      // If this heuristic doesn’t work well for you, don’t use `proxy`.
      htmlAcceptHeaders: proxy ? [ 'text/html' ] : [ 'text/html', '*/*' ]
    })
  );
  if (proxy) {
    if (typeof proxy !== 'string') {
      console.log(
        chalk.red('When specified, "proxy" in package.json must be a string.')
      );
      console.log(
        chalk.red('Instead, the type of "proxy" was "' + typeof proxy + '".')
      );
      console.log(
        chalk.red(
          'Either remove "proxy" from package.json, or make it a string.'
        )
      );
      process.exit(1);
    }

    // Otherwise, if proxy is specified, we will let it handle any request.
    // There are a few exceptions which we won't send to the proxy:
    // - /index.html (served as HTML5 history API fallback)
    // - /*.hot-update.json (WebpackDevServer uses this too for hot reloading)
    // - /sockjs-node/* (WebpackDevServer uses this for hot reloading)
    // Tip: use https://jex.im/regulex/ to visualize the regex
    const mayProxy = /^(?!\/(index\.html$|.*\.hot-update\.json$|sockjs-node\/)).*$/;

    // Pass the scope regex both to Express and to the middleware for proxying
    // of both HTTP and WebSockets to work without false positives.
    const hpm = httpProxyMiddleware(pathname => mayProxy.test(pathname), {
      target: proxy,
      logLevel: 'silent',
      onProxyReq: function(proxyReq, req, res) {
        // Browers may send Origin headers even with same-origin
        // requests. To prevent CORS issues, we have to change
        // the Origin to match the target URL.
        if (proxyReq.getHeader('origin')) {
          proxyReq.setHeader('origin', proxy);
        }
      },
      onError: onProxyError(proxy),
      secure: false,
      changeOrigin: true,
      ws: true
    });
    devServer.use(mayProxy, hpm);

    // Listen for the websocket 'upgrade' event and upgrade the connection.
    // If this is not done, httpProxyMiddleware will not try to upgrade until
    // an initial plain HTTP request is made.
    devServer.listeningApp.on('upgrade', hpm.upgrade);
  }

  // Finally, by now we have certainly resolved the URL.
  // It may be /index.html, so let the dev server try serving it again.
  devServer.use(devServer.middleware);
};

const runDevServer = (compiler, host, port, protocol) => {
  const devServer = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'none',
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_PATH%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.appPublic,
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: { ignored: /node_modules/ },
    // Enable HTTPS if the HTTPS environment constiable is set to 'true'
    https: protocol === 'https',
    host: host
  });

  // Our custom middleware proxies requests to /index.html or a remote API.
  addMiddleware(devServer);

  // Launch WebpackDevServer.
  devServer.listen(port, (err, result) => {
    if (err) {
      return console.log(err);
    }

    if (isInteractive) {
      clearConsole();
    }
    console.log(chalk.cyan('Starting the development server...'));
    console.log();

    if (isInteractive) {
      openBrowser(protocol + '://' + host + ':' + port + '/');
    }
  });
};

const run = port => {
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const host = process.env.HOST || 'localhost';
  const compiler = setupCompiler(host, port, protocol);
  runDevServer(compiler, host, port, protocol);
};

wrapMaybeChangePort(run, { isInteractive, clearConsole })();
// const WebSocketClient = require('websocket').client;
//
// const client = new WebSocketClient();
//
// client.on('connectFailed', error => {
//   console.log('Connect Error: ' + error.toString());
// });
//
// client.on('connect', connection => {
//   console.log('WebSocket Client Connected');
//   connection.on('error', error => {
//     console.log('Connection Error: ' + error.toString());
//   });
//   connection.on('close', () => {
//     console.log('echo-protocol Connection Closed');
//   });
//   connection.on('message', message => {
//     if (message.type === 'utf8') {
//       console.log("Received: '" + message.utf8Data + "'");
//     }
//   });
//
//   setInterval(
//     () => {
//       connection.sendUTF('web - ping');
//     },
//     2000
//   );
// });
// client.connect('ws://localhost:4000/', 'echo-protocol');

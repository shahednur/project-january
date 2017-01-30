//@flow
const NO_CONNECTION = null;

import { createAction } from 'redux-actions';

const W3CWebSocket = require('websocket').w3cwebsocket;

export const ActionTypes = {
  WEBSOCKET_CONNECTED: '@@redux-websocket/WEBSOCKET_CONNECTED',
  WEBSOCKET_DISCONNECTED: '@@redux-websocket/WEBSOCKET_DISCONNECTED',
  WEBSOCKET_ERROR: '@@redux-websocket/WEBSOCKET_ERROR',
  RECEIVED_WEBSOCKET_DATA: '@@redux-websocket/RECEIVED_WEBSOCKET_DATA'
};

type Action = {
  type: $Keys<typeof ActionTypes>,
  payload: { message: string },
  meta: { socket: string }
};

export const isSocketAction = (action: Action) =>
  Boolean(action && action.meta && action.meta.socket) &&
    [
      ActionTypes.WEBSOCKET_CONNECTED,
      ActionTypes.WEBSOCKET_DISCONNECTED,
      ActionTypes.RECEIVED_WEBSOCKET_DATA,
      ActionTypes.WEBSOCKET_ERROR
    ].indexOf(action.type) >
      -1;

const undefinedEndpointErrorMessage = action =>
  `Whoops! You tried to dispatch an action to a socket instance that
  doesn't exist, as you didn't specify an endpoint in the action itself:
  ${JSON.stringify(action, null, 4)}
  Or you didn't set the 'defaultEndpoint' config option when creating your
  middleware instance.`;

export const createConnectionAction = (endpoint: string) =>
  createAction(ActionTypes.WEBSOCKET_CONNECTED, () => undefined, () => ({
    socket: endpoint
  }));

export const createDisonnectionAction = (endpoint: string) =>
  createAction(ActionTypes.WEBSOCKET_DISCONNECTED, () => undefined, () => ({
    socket: endpoint
  }));

export const createErrorAction = (endpoint: string, error: Error) =>
  createAction(ActionTypes.WEBSOCKET_ERROR, () => new Error(error), () => ({
    socket: endpoint,
    error: true
  }));

export const createMessageAction = (endpoint: string) =>
  createAction(ActionTypes.RECEIVED_WEBSOCKET_DATA, id => id, () => ({
    socket: endpoint
  }));

export const createWebsocketMiddleware = (
  options: { defaultEndpoint?: string } = {}
) =>
  {
    const connections = {};
    //$FlowIssue
    return (store: Function) => {
      const setupSocket = (endpoint: string) => {
        const socket = new W3CWebSocket(endpoint, 'echo-protocol');

        const connection = { endpoint: endpoint, socket, queue: [] };

        connections[endpoint] = connection;
        const currentSocket = connection.socket;

        currentSocket.onmessage = ({ data }: { data: string }) => {
          const json = JSON.parse(data);
          const action = createMessageAction(endpoint)(json);
          console.log(action);
          store.dispatch(action);
        };

        currentSocket.onopen = () =>
          store.dispatch(createConnectionAction(endpoint)());

        currentSocket.onclose = () =>
          store.dispatch(createDisonnectionAction(endpoint)());

        currentSocket.onerror = error =>
          store.dispatch(createErrorAction(endpoint, error)());

        return connection;
      };

      if (options.defaultEndpoint) {
        setupSocket(options.defaultEndpoint);
      }

      //$FlowIssue
      return (next: Function) => (action: Action) => {
        if (!isSocketAction(action)) {
          return next(action);
        }

        const getConnection = (endpoint: string) => {
          switch (typeof endpoint) {
            case 'string':
              if (connections[endpoint]) {
                return connections[endpoint];
              }
              return setupSocket(endpoint);
            case 'boolean':
              //$FlowIssue
              return connections[options.defaultEndpoint];
            default:
              return setupSocket(endpoint);
          }
        };
        const endpoint = action.meta.socket;

        const connection = getConnection(endpoint);

        if (connection === NO_CONNECTION && !options.defaultEndpoint) {
          throw new Error(undefinedEndpointErrorMessage(action));
        }

        const oldOnOpen = connection.socket.onopen;

        connection.socket.onopen = () => {
          oldOnOpen();
          if (action.meta.incoming) {
            return next(action);
          } else {
            const { message } = action.payload;
            connection.socket.send(message);
          }
        };
        return connection;
      };
    };
  };

export default createWebsocketMiddleware;

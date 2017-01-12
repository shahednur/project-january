//@flow

import React from 'react'

export default {
  main: {
    path: '/',
    render: () =>
      <div>home</div>
  },
  users: {
    path: '/users',
    render: () =>
      <div>users</div>
  },
  userDetails: {
    path: '/users/:userid',
    render: ({userid}:{userid:string}) =>
      <div>user: {userid}</div>
  },
};

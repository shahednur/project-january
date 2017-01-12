//@flow

import React from 'react'

export default {
  main: {
    path: '/',
    render: () =>
      <div>1</div>
  },
  users: {
    path: '/users',
    render: () =>
      <div>2</div>
  },
  userDetails: {
    path: '/users/:userid',
    render: ({userid}:{userid:string}) =>
      <div>{userid}</div>
  },

};

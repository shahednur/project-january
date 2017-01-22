//@flow

import React from 'react';

export default {
  home: {
    path: '/',
    render: () => (
      <div>
        home
      </div>
    ),
  },
  users: {
    path: '/users',
    render: () => (
      <div>
        users
      </div>
    ),
  },
  userDetails: {
    path: '/users/:userid',
    params: { userid: 'string' },
    render: ({ userid }: { userid: string }) => (
      <div>
        user: {userid}
      </div>
    ),
  },
}

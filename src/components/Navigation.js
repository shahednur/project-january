//@flow

import React from 'react';
import routes from '../routes';

const {
  home: { Link: HomeLink },
  users: { Link: UsersLink },
  userDetails: { Link: UserDetailsLink },
} = routes;

export default () => (
  <div>
    <HomeLink>
      home
    </HomeLink>
    <UsersLink>
      users
    </UsersLink>
    <UserDetailsLink params={{ userid: '1' }}>
      user qwerty
    </UserDetailsLink>
  </div>
);

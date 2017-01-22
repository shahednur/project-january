//@flow

import React from 'react';
import routes from '../routes';
import { HBox, Element } from 'react-stylesheet';
const {
  home: { Link: HomeLink },
  users: { Link: UsersLink },
  userDetails: { Link: UserDetailsLink },
} = routes;

export default () => (
  <HBox justifyContent="space-between">
    <HomeLink>
      <Element background="red" color="yellow">
        home I'm styled!
      </Element>
    </HomeLink>
    <UsersLink>
      users
    </UsersLink>
    <UserDetailsLink params={{ userid: '1' }}>
      user qwerty
    </UserDetailsLink>
  </HBox>
);

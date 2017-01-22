//@flow

import React from 'react';
import Link from '../Link';

const Link_home = (args: $Exact<{}>) => {
  const LinkComp = Link('home');
  return <LinkComp />;
};
const Link_users = (args: $Exact<{}>) => {
  const LinkComp = Link('users');
  return <LinkComp />;
};
const Link_userDetails = (
  { params }: { params: $Exact<{ userid: string }> },
) =>
  {
    const LinkComp = Link('userDetails', params);
    return <LinkComp />;
  };

export default {
  home: { Link: Link_home },
  users: { Link: Link_users },
  userDetails: { Link: Link_userDetails },
};

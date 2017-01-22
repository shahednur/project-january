//@flow

import React from 'react';
import Link from '../Link';

const Link_home = (
  { children }: $Exact<{ children?: any }>,
) =>
  {
    const LinkComp = Link('home');
    return <LinkComp>{children}</LinkComp>;
  };
const Link_users = (
  { children }: $Exact<{ children?: any }>,
) =>
  {
    const LinkComp = Link('users');
    return <LinkComp>{children}</LinkComp>;
  };
const Link_userDetails = (
  {
    params,
    children,
  }: $Exact<{
    params: $Exact<{ userid: string }>,
    children?: any,
  }>,
) =>
  {
    const LinkComp = Link('userDetails', params);
    return <LinkComp>{children}</LinkComp>;
  };

export default {
  home: { Link: Link_home },
  users: { Link: Link_users },
  userDetails: { Link: Link_userDetails },
};

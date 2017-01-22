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
const Link_commit = (
  {
    params,
    children,
  }: $Exact<{
    params: $Exact<{ repo: string, commit: string }>,
    children?: any,
  }>,
) =>
  {
    const LinkComp = Link('commit', params);
    return <LinkComp>{children}</LinkComp>;
  };
const Link_repo = (
  {
    params,
    children,
  }: $Exact<{
    params: $Exact<{ repoName: string, author: string }>,
    children?: any,
  }>,
) =>
  {
    const LinkComp = Link('repo', params);
    return <LinkComp>{children}</LinkComp>;
  };
const Link_status = (
  { children }: $Exact<{ children?: any }>,
) =>
  {
    const LinkComp = Link('status');
    return <LinkComp>{children}</LinkComp>;
  };

export default {
  home: { Link: Link_home },
  commit: { Link: Link_commit },
  repo: { Link: Link_repo },
  status: { Link: Link_status },
};

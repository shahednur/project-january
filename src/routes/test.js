//@flow

import React from 'react';

export type Route<Params> = {
  path: string,
  render(Params): React.Element<*>,
};

export let repoRoute: Route<{ repoName: string }> = {
  path: '/repo/:name',
  render: params => <div>{params.repoName}</div>,
};

export const genLink = <P, R: Route<P>>(route: R) =>
  (params: P): string => {
    return '';
  };

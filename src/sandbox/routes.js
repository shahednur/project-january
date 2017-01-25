import React from 'react';
import type { Route } from './app';

export let commitRoute: Route<{
  repoName: string,
  commit: string,
}> = {
  path: '/repo/:repoName/:commit',
  render: params => (
    <div>{params.repoName} {params.commit}</div>
  ),
};

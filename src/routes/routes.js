//@flow

import React from 'react';
import R from 'ramda';
import Home from '../containers/Home';
import Commit from '../containers/Commit';
import Repo from '../containers/Repo';
import Status from '../containers/Status';

// import type { Route } from './test';
export type Route<Params> = { path: string, render(Params): React.Element<*> };

// import { genLink } from './test';
let commitRoute: Route<{| repoName: string, commit: string |}> = {
  path: '/repo/:repoName/:commit',
  render: params => <div>{params.repoName} {params.commit}</div>
};

const substituteParams = (pathName, params) => {
  let finalPathName = pathName;
  R.forEach(([ paramName, value ]) => {
    finalPathName = finalPathName.split(':' + paramName).join(value);
  })(R.toPairs(params));
  return finalPathName;
};

export const genLink = <P: Object, R: Route<P>>(route: R) =>
  <P1: P>(params: P1): string => {
    return substituteParams(route.path, params);
  };

const t = genLink(commitRoute, { repoName: 't' });

export default {
  home: { path: '/', render: Home },
  commit: {
    path: '/commit/:repo/:commit',
    params: { repo: 'string', commit: 'string' },
    render: Commit
  },
  repo: {
    path: '/repo/:author/:repoName',
    params: { repoName: 'string', author: 'string' },
    render: Repo
  },
  status: { path: '/status', render: Status }
}

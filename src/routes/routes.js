//@flow

import Home from '../containers/Home';
import GitCommit from '../containers/GitCommit';
import Repo from '../containers/Repo';
import Stats from '../containers/Stats';

export default {
  home: { path: '/', render: Home },
  commit: {
    path: '/commit/:author/:repoName/:commit',
    params: { author: 'string', repoName: 'string', commit: 'string' },
    render: GitCommit
  },
  repo: {
    path: '/repo/:author/:repoName',
    params: { author: 'string', repoName: 'string' },
    render: Repo
  },
  status: { path: '/stats', render: Stats }
};

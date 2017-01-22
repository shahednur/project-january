//@flow

import Home from '../containers/Home';
import Commit from '../containers/Commit';
import Repo from '../containers/Repo';
import Status from '../containers/Status';

export default {
  home: { path: '/', render: Home },
  commit: {
    path: '/commit/:repo/:commit',
    params: { repo: 'string', commit: 'string' },
    render: Commit,
  },
  repo: {
    path: '/repo/:repo',
    params: { repo: 'string' },
    render: Repo,
  },
  status: { path: '/status', render: Status },
}

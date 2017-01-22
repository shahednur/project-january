//@flow

import routes from './routes';
import links from './generated/links';

export default {
  home: { ...routes.home, ...links.home },
  commit: { ...routes.commit, ...links.commit },
  repo: { ...routes.repo, ...links.repo },
  status: { ...routes.status, ...links.status },
}

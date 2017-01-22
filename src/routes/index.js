//@flow

import routes from './routes';
import links from './generated/links';

export default {
  home: { ...routes.home, ...links.home },
  users: { ...routes.users, ...links.users },
  userDetails: {
    ...routes.userDetails,
    ...links.userDetails,
  },
};

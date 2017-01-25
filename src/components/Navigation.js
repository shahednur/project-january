//@flow

import React from 'react';
import routes from '../routes';
import { HBox, Element } from 'react-stylesheet';
const {
  home: { Link: HomeLink },
  repo: { Link: RepoLink },
  commit: { Link: CommitLink },
  status: { Link: StatusLink }
} = routes;

export default () => (
  <HBox justifyContent="space-between" padding="20">
    <HomeLink>
      <Element colorOnHover="blue">
        home
      </Element>
    </HomeLink>
    <RepoLink params={{ author: 'lapanoid', repoName: 'project-january' }}>
      <Element colorOnHover="blue">
        this repo link
      </Element>
    </RepoLink>
    <CommitLink
      params={
        {
          author: 'lapanoid',
          repoName: 'project-january',
          commit: '4ac1555472bd485dec365f3568f861227099a5bc'
        }
      }
    >
      <Element colorOnHover="blue">
        this repo/commit link
      </Element>
    </CommitLink>
    <StatusLink>
      <Element colorOnHover="blue">
        status
      </Element>
    </StatusLink>
  </HBox>
);

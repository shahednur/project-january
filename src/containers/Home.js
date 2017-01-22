//@flow

import React from 'react';
import { Element, VBox } from 'react-stylesheet';

const MdText = ({ text }: { text: string }) => (
  <Element whiteSpace="pre">
    {text}
  </Element>
);

export default () => (
  <VBox padding="20">
    <MdText
      text={`
        User story:
        1. user opens url providing
        -  github repo
        -  commit sha
        2. see error if no such repo/commit no available container
        3. see penging page if there is available container
        4. when succeed see deployed site

        Backend story:

        0. pick where to host f.e. digital ocean/heroku
        1. initialize pool of containers
        2. on user request initialize websocket to ping if user is still there
        3. initialize container on that repository/commit (matching algorithm)
        - look if there are available containers for that repo/commit -> if there is one provide one(mark as not available)
        - if there is no available -> pick oldest by user usage container -> release resources -> provide one(mark as not available)
        - first look for repo/commit match -> then if no commit match -> look for repo match
        4. if user is not there, release (mark container as available)

        Repo page: maybe make page of the repo, where you see git tree -> click and go to link for navigation

        Instances page: maybe make page, to see current status on container pool
      `}
    />
  </VBox>
);

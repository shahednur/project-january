//@flow

import React from 'react';
import { Element } from 'react-stylesheet';

export default ({ repo }: { repo: string }) => (
  <Element padding="20">
    repo: {repo}
  </Element>
);

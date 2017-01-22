//@flow

import React from 'react';

import { VBox, Element } from 'react-stylesheet';
export default (
  { repo, commit }: { repo: string, commit: string },
) => (
  <VBox padding="20">
    <Element>repo: {repo}</Element>
    <Element>commit: {commit}</Element>
  </VBox>
);

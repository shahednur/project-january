//@flow

import React from 'react';
import { Controller, Model } from '../Root';
import { VBox, Element } from 'react-stylesheet';

type Props = {
  dispatch(action: Controller.Action): void,
  state: Model.State,
  params: *,
};

export default (
  { params: { repoName, commit } }: Props,
) => (
  <VBox padding="20">
    <Element>repoName: {repoName}</Element>
    <Element>commit: {commit}</Element>
  </VBox>
);

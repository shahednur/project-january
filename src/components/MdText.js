//@flow

import React from 'react';
import { Element } from 'react-stylesheet';

export default ({ text }: { text: string }) => (
  <Element whiteSpace="pre">
    {text}
  </Element>
);

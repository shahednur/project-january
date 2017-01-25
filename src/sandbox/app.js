import React from 'react';

export type Route<Params> = {
  path: string,
  render(Params): React.Element<*>,
};

export const genLink = <P, R: Route<P>>(
  route: R,
  params: P,
): string =>
  {
    return '';
  };

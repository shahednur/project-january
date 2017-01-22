// @flow

import R from 'ramda';
import fs from 'fs';
import routes from '../routes';
import { genFileByExports } from './genUtils';

const genObjectAnnotation = obj =>
  JSON.stringify(obj).split('"').join('');

const genIndex = () => {
  const body = `
import routes from './routes';
import links from './generated/links';`;

  const default_ = `{
  ${R.compose(
    ar => ar.join('\n'),
    R.map(
      route =>
        `${route}: { ...routes.${route}, ...links.${route} },`,
    ),
    Object.keys,
  )(routes)}
}`;

  return genFileByExports({
    body,
    exports_: { default: default_ },
  });
};

const genLinks = () => {
  const genImports = () => `
import React from 'react';
import Link from '../Link';
`;

  const genNoParamsLinkFunc = route =>
    `({children}: $Exact<{ children?: any }>) => {
    const LinkComp = Link('${route}');
    return <LinkComp>{children}</LinkComp>;
  };`;

  const genWithParamsLinkFunc = (route, params) => `(
    { params, children }: $Exact<{ params: $Exact<${genObjectAnnotation(
    params,
  )}>, children?: any }>,
  ) =>
    {
      const LinkComp = Link('${route}', params);
      return <LinkComp>{children}</LinkComp>;
    };`;

  const genLinkFunc = (route, params) =>
    params
      ? genWithParamsLinkFunc(route, params)
      : genNoParamsLinkFunc(route);

  const body = `
${genImports()}

${R.compose(
    ar => ar.join('\n'),
    R.map(
      ([ route, obj ]) =>
        `const Link_${route} = ${genLinkFunc(
          route,
          obj.params ? obj.params : undefined,
        )}`,
    ),
    R.toPairs,
  )(routes)}
`;

  const default_ = `{
  ${R.compose(
    ar => ar.join('\n'),
    R.map(
      ([ route ]) => `${route}: {
          Link: Link_${route},
        },`,
    ),
    R.toPairs,
  )(routes)}
}`;

  return genFileByExports({
    body,
    exports_: { default: default_ },
  });
};

const indexData = genIndex();
const linksData = genLinks();

const addLines = R.compose(
  ar => ar.join('\n'),
  ar => ar.map((val, idx) => idx + ': ' + val),
  (str: string) => str.split('\n'),
);

console.log(addLines(indexData));
console.log(addLines(linksData));

fs.writeFileSync(`${__dirname}/../index.js`, indexData);
fs.writeFileSync(
  `${__dirname}/../generated/links.js`,
  linksData,
);

//@flow

import R from 'ramda';
import prettier from 'prettier';

const format = source =>
  prettier.format(source, {
    printWidth: 60,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: true,
    bracketSpacing: true,
    parser: 'flow',
  });

export const genFile = (
  {
    body,
    exports_,
    default_,
  }: {|
    body?: string,
    exports_: Array<*>,
    default_?: string,
  |},
) =>
  {
    const generated = `//@flow
     ${body ? body : ''}
     ${R.compose(
      ar => ar.join('\n'),
      R.map(
        ({ name, var_ }) =>
          `export const ${name} = ${var_}`,
      ),
    )(exports_)}

     ${default_ ? `export default ${default_}` : ''}
`;

    let res = generated;
    try {
      res = format(generated);
    } catch (e) {
      console.log(e);
    }
    return res;
  };

export const genFileByExports = (
  {
    body,
    exports_,
  }: {|
    body?: string,
    exports_: { [key: string]: string },
  |},
) =>
  {
    const default_ = exports_.default;
    delete exports_.default;

    return genFile({
      body,
      default_,
      exports_: R.compose(
        R.map(([ name, var_ ]) => ({ name, var_ })),
        R.toPairs,
      )(exports_),
    });
  };

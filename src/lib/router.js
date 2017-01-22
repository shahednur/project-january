//@flow
import pathToRegexp from 'path-to-regexp';

const patternCache = { true: {}, false: {} };
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (pattern, exact) => {
  const cache = patternCache[exact.toString()];

  if (cache[pattern]) return cache[pattern];

  const keys = [];
  const re = pathToRegexp(pattern, keys, {
    end: exact,
    strict: true,
  });
  const compiledPattern = { re, keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

/**
 * Public API for matching a URL pathname to a path pattern.
 */
export const matchPath = (
  pathname: string,
  path: string,
  exact?: boolean = false,
) =>
  {
    if (!path)
      return { url: pathname, isExact: true, params: {} };

    const {
      re,
      keys,
    }: { re: RegExp, keys: Array<*> } = compilePath(
      path,
      exact,
    );

    const match = re.exec(pathname);

    if (!match) return null;

    const [ url, ...values ] = match;
    const isExact = pathname === url;

    if (exact && !isExact) return null;

    return {
      path,
      // the path pattern used to match
      url,
      // the matched portion of the URL
      isExact,
      // whether or not we matched exactly
      params: keys.reduce(
        (memo, key, index) => {
          memo[key.name] = values[index];
          return memo;
        },
        {},
      ),
    };
  };

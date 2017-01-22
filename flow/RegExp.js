declare class RegExp {
  static (
    pattern: string | RegExp,
    flags?: RegExp$flags,
  ): RegExp,
  compile(): RegExp,
  constructor(
    pattern: string | RegExp,
    flags?: RegExp$flags,
  ): RegExp,
  exec(string: string): Array<string>,
  flags: string,
  global: boolean,
  ignoreCase: boolean,
  lastIndex: number,
  multiline: boolean,
  source: string,
  sticky: boolean,
  unicode: boolean,
  test(string: string): boolean,
  toString(): string,
}

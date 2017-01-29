//@flow

type MessageTypes = 'CI' | 'SYSTEM' | 'STATS';

export const create = (type: MessageTypes) =>
  (value: string | Object) => ({ type, value });

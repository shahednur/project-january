//@flow

type MessageTypes = 'CI' | 'SYSTEM';

export const create = (type: MessageTypes) =>
  (value: string) => ({ type, value });

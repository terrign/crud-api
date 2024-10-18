import type { UUID } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';

type TController = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => Promise<void>;

type TUser = {
  id: UUID;
  username: string;
  age: number;
  hobbies: string[];
};

type TUserStore = Record<UUID, TUser>;

type TDynamicRoute = `[${string}]`;

type TApi = {
  [path: string]: TController | TApi;
};

export { type TApi, type TController, type TDynamicRoute, type TUser, type TUserStore };

export { isValidId } from './guards';

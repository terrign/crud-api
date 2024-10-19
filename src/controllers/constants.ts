import type { TApi } from '@/types';

import { createUser, getAllUsers, getUserById } from './user';

const serverEndpoints = {
  api: {
    users: {
      GET: getAllUsers,
      POST: createUser,
      '[userid]': {
        GET: getUserById,
        DELETE: async () => {},
        PUT: async () => {},
      },
    },
  },
} satisfies TApi;

export { serverEndpoints };

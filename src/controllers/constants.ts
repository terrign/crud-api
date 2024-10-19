import type { TApi } from '@/types';

import { createUser, deleteUser, getAllUsers, getUserById } from './user';

const serverEndpoints = {
  api: {
    users: {
      GET: getAllUsers,
      POST: createUser,
      '[userid]': {
        GET: getUserById,
        DELETE: deleteUser,
        PUT: async () => {},
      },
    },
  },
} satisfies TApi;

export { serverEndpoints };

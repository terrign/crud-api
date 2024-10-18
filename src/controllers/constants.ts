import type { TApi } from '@/types';

import { getAllUsers, getUserById } from './user';

const serverEndpoints = {
  api: {
    users: {
      GET: getAllUsers,
      POST: async () => {},
      '[userid]': {
        GET: getUserById,
        DELETE: async () => {},
        PUT: async () => {},
      },
    },
  },
} satisfies TApi;

export { serverEndpoints };

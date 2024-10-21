import type { TApi } from '@/types';

import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user';

const serverEndpoints = {
  api: {
    users: {
      GET: getAllUsers,
      POST: createUser,
      '[userid]': {
        GET: getUserById,
        DELETE: deleteUser,
        PUT: updateUser,
      },
    },
  },
} satisfies TApi;

export { serverEndpoints };

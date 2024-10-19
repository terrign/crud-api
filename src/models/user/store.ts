import type { UUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

import type { TUser, TUserStore } from '@/types';

const pathToStore = new URL('./users.json', import.meta.url);

function useStore() {
  const writeToStore = async (store: TUserStore) => {
    try {
      await writeFile(pathToStore, JSON.stringify(store));

      return true;
    } catch (e) {
      console.error('useStore: write', e);

      return false;
    }
  };

  const get = async () => {
    try {
      const rawUsers = await readFile(pathToStore, 'utf-8');

      return JSON.parse(rawUsers) as TUserStore;
    } catch (e) {
      console.error('useStore: read', e);

      return {};
    }
  };

  const add = async (newUser: TUser) => {
    const users = await get();

    users[newUser.id] = newUser;

    return writeToStore(users);
  };

  const remove = async (id: UUID) => {
    const users = await get();

    if (!users[id]) {
      return false;
    }

    delete users[id];

    return writeToStore(users);
  };

  const update = async (newUser: TUser) => {
    const users = await get();

    if (!users[newUser.id]) {
      return false;
    }

    users[newUser.id] = newUser;

    await writeToStore(users);

    return newUser;
  };

  return { get, add, remove, update };
}

export { useStore };

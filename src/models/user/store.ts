import type { UUID } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

import type { TUser, TUserStore } from '@/types';

const pathToStore = new URL('./users.json', import.meta.url);

function useStore() {
  const get = async () => {
    try {
      const rawUsers = await readFile(pathToStore, 'utf-8');

      return JSON.parse(rawUsers) as TUserStore;
    } catch (e) {
      console.error('useStore: get', e);

      return {};
    }
  };

  const add = async (newUser: TUser) => {
    const users = await get();

    users[newUser.id] = newUser;

    try {
      await writeFile(pathToStore, JSON.stringify(users));

      return true;
    } catch (e) {
      console.error('useStore: write', e);

      return false;
    }
  };

  const remove = async (id: UUID) => {
    const users = await get();

    if (!users[id]) {
      return false;
    }

    const record = { ...users[id] };

    delete users[id];

    try {
      await writeFile(pathToStore, JSON.stringify(users));

      return record;
    } catch (e) {
      console.error('useStore: delete', e);

      return false;
    }
  };

  return { get, add, remove };
}

export { useStore };

import { readFile } from 'node:fs/promises';

import type { TUserStore } from '@/types';

const pathToStore = new URL('./users.json', import.meta.url);

async function useStore() {
  try {
    const rawUsers = await readFile(pathToStore, 'utf-8');

    return JSON.parse(rawUsers) as TUserStore;
  } catch (e) {
    console.error(e);

    return {};
  }
}

export { useStore };

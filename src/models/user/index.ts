import { type UUID } from 'node:crypto';

import { useStore } from './store';

const getAll = async () => {
  const users = await useStore();

  return users;
};

const getById = async (id: UUID) => {
  const users = await useStore();

  return users[id];
};

// const createUser = async (newUser: Omit<TUser, 'id'>) => {};

// const deleteUser = async (id: UUID) => {};

export { getAll, getById };

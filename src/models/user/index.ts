import { randomUUID, type UUID } from 'node:crypto';

import { userStore } from '@/models/user/store';
import type { TUser } from '@/types';

type TValidateUserReturn = { ok: false; error: string } | { ok: true };

const validateUser = (newUser: Omit<TUser, 'id'>): TValidateUserReturn => {
  if (!newUser.age || !newUser.hobbies || !newUser.username) {
    return { ok: false, error: 'Missing required fields. age: number, hobbies: Array<string>, username: string' };
  }

  if (typeof newUser.age !== 'number') {
    return { ok: false, error: 'Age must be a number' };
  }

  if (typeof newUser.username !== 'string') {
    return { ok: false, error: 'Username must be a string' };
  }

  if (!Array.isArray(newUser.hobbies)) {
    return { ok: false, error: 'Hobbies must be an array' };
  }

  if (newUser.hobbies.some((it) => typeof it !== 'string')) {
    return { ok: false, error: 'Hobbies must be an array of strings' };
  }

  return { ok: true };
};

const getAll = async () => {
  const { get } = userStore;

  return Object.values(await get());
};

const getById = async (id: UUID): Promise<TUser | null> => {
  const { get } = userStore;

  return (await get())[id] ?? null;
};

type TCreateReturnType = { ok: false; desc: string } | { ok: true; desc: TUser };

const create = async (newUser: Omit<TUser, 'id'>): Promise<TCreateReturnType> => {
  const validated = validateUser(newUser);

  if (!validated.ok) {
    return { ok: false, desc: validated.error };
  }

  const { username, hobbies, age } = newUser;

  const newRecord = {
    id: randomUUID(),
    username,
    hobbies,
    age,
  };

  const { add } = userStore;

  const res = await add(newRecord);

  if (res) {
    return { ok: true, desc: newRecord };
  }

  return { ok: false, desc: 'Something went wrong' };
};

type TRemoveReturn = { ok: true } | { ok: false; desc: string };

const remove = async (id: UUID): Promise<TRemoveReturn> => {
  const { remove } = userStore;

  const res = await remove(id);

  if (res) {
    return { ok: true };
  }

  return { ok: false, desc: 'User not found' };
};

const update = async (updatedUser: TUser): Promise<TCreateReturnType> => {
  const validated = validateUser(updatedUser);

  if (!validated.ok) {
    return { ok: false, desc: validated.error };
  }

  const { username, hobbies, age } = updatedUser;

  const updatedRecord = {
    id: updatedUser.id,
    username,
    hobbies,
    age,
  };

  const { update } = userStore;

  const res = await update(updatedRecord);

  if (res) {
    return { ok: true, desc: updatedRecord };
  }

  return { ok: false, desc: 'User not found' };
};

const User = { create, getAll, getById, remove, update };

export { User };

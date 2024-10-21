import { randomUUID } from 'crypto';
import { unlink, writeFile } from 'fs/promises';
import path from 'path';

import { createUserStore } from '@/models/user/store';
import type { TUser } from '@/types';

const testUser = { id: randomUUID(), username: 'test', age: 23, hobbies: ['hobby'] };

const tempUserStorePath = path.join(__dirname, 'tempStore.json');

const userStore = createUserStore(tempUserStorePath);

describe('User store', () => {
  beforeAll(async () => {
    await writeFile(tempUserStorePath, '{}');
  });

  afterEach(async () => {
    await writeFile(tempUserStorePath, '{}', 'utf-8');
  });

  afterAll(async () => {
    await unlink(tempUserStorePath);
  });

  it('Returns empty object if there are no records', async () => {
    const res = await userStore.get();
    expect(res).toEqual({});
  });

  it('Adds user', async () => {
    await userStore.add(testUser);
    const createdUser = (await userStore.get())[testUser.id];
    expect(createdUser).toEqual(testUser);
  });

  it('Removes user', async () => {
    await userStore.add(testUser);
    await userStore.remove(testUser.id);
    expect((await userStore.get())[testUser.id]).toBeUndefined();
  });

  it('Correctly updates user', async () => {
    await userStore.add(testUser);
    await userStore.update({ ...testUser, username: 'newUserName' }) as TUser;
    const updated = (await userStore.get())[testUser.id];
    expect(updated.username).toBe('newUserName');
    expect(updated.age).toBe(testUser.age);
    expect(updated.hobbies).toEqual(testUser.hobbies);
  });
});

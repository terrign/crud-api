import { writeFile } from 'fs/promises';

import { API_URL, USER_STORE_PATH } from '@/config';
import type { TUser } from '@/types';

const testUser: Omit<TUser, 'id'> = {
  username: 'testUser',
  age: 33,
  hobbies: ['test'],
};

describe('api/users', () => {
  beforeAll(async () => {
    await writeFile(USER_STORE_PATH, '{}');
  });

  afterAll(async () => {
    await writeFile(USER_STORE_PATH, '{}');
  });

  it('Correctly handles GET, POST, PUT, DELETE requests', async () => {
    const res = await fetch(`${API_URL}/api/users`).then((res) => res.json());
    // Get all records with a GET api/users request (an empty array is expected)
    expect(res).toEqual([]);

    const createUserResult = await fetch(`${API_URL}/api/users`,
      { method: 'POST', body: JSON.stringify(testUser) })
      .then((res) => res.json() as unknown as TUser);

    // A new object is created by a POST api/users request (a response containing newly created record is expected)
    expect(createUserResult).toEqual({ ...testUser, id: createUserResult.id });

    const createdUser = await fetch(`${API_URL}/api/users/${createUserResult.id}`)
      .then((res) => res.json() as unknown as TUser);

    // With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)
    expect(createUserResult).toEqual(createdUser);

    const updatedUser = await fetch(`${API_URL}/api/users/${createUserResult.id}`,
      { method: 'PUT', body: JSON.stringify({ ...testUser, username: 'updatedUsername' }) })
      .then((res) => res.json() as unknown as TUser);

    // We try to update the created record with a PUT api/users/{userId}request
    // (a response is expected containing an updated object with the same id)
    expect(updatedUser).toEqual({ id: createUserResult.id, ...testUser, username: 'updatedUsername' });

    const deleteUserResult = await fetch(`${API_URL}/api/users/${createUserResult.id}`, { method: 'DELETE' });

    // With a DELETE api/users/{userId} request, we delete the created object by id
    // (confirmation of successful deletion is expected)
    expect(deleteUserResult.status).toBe(204);

    const fetchDeletedUserResult = await fetch(`${API_URL}/api/users/${createUserResult.id}`);

    // With a GET api/users/{userId} request, we are trying to get a deleted object by id
    // (expected answer is that there is no such object)
    expect(fetchDeletedUserResult.status).toBe(404);
    expect(await fetchDeletedUserResult.json()).toEqual({ error: 'User not found' });
  });
});

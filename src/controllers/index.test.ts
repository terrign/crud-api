import { randomUUID } from 'crypto';

import { getController } from '@/controllers/getController';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '@/controllers/user';

const correctCases = [
  { path: `api/users`, method: `GET`, expected: getAllUsers },
  { path: `api/users`, method: `POST`, expected: createUser },
  { path: `api/users/${randomUUID()}`, method: `GET`, expected: getUserById },
  { path: `api/users/${randomUUID()}`, method: `PUT`, expected: updateUser },
  { path: `api/users/${randomUUID()}`, method: `DELETE`, expected: deleteUser },
];

const incorrectCases = [
  { path: `api/users/wrongPath`, method: `HEAD` },
  { path: `api/users`, method: `PATCH` },
  { path: `api/users/${randomUUID()}/wrongPath`, method: `POST` },
  { path: `api/users/${randomUUID()}/`, method: `PATCH` },

];

describe(`correctCases`, () => {
  it.each(correctCases)(`returns correct controller. Path: $path, method: $method`,
    ({ path, method, expected }) => {
      expect(getController(path, method)).toBe(expected);
    });

  it('returns null, if no method provided', () => {
    expect(getController('api/users')).toBeNull();
  });

  it.each(incorrectCases)(`returns null for incorrect path or method. Path: $path, method: $method`,
    ({ path, method }) => {
      expect(getController(path, method)).toBeNull();
    });
});

import { create, getAll, getById } from '@/models/user';
import { isValidId, type TController, type TUser } from '@/types';
import { parseUrl, readBody, responseError } from '@/utils';

const getAllUsers: TController = async (req, res) => {
  const users = await getAll();

  res.write(JSON.stringify(users));
  res.statusCode = 200;
};

const getUserById: TController = async (req, res) => {
  const userId = parseUrl(req).pathname.split('/').find(isValidId);

  if (!isValidId(userId)) {
    res.statusCode = 400;
    res.write(responseError('Invalid user id'));

    return;
  }

  const user = await getById(userId);

  if (user) {
    res.statusCode = 200;
    res.write(JSON.stringify(user));

    return;
  }

  res.statusCode = 404;
  res.write(responseError('User not found'));
};

const createUser: TController = async (req, res) => {
  const body = await readBody(req);

  try {
    const user = JSON.parse(body) as TUser;
    const result = await create(user);

    if (result.ok) {
      res.statusCode = 201;
      res.write(JSON.stringify(result.desc));

      return;
    }

    res.statusCode = 400;
    res.write(responseError(result.desc));
  } catch (e) {
    console.error('createUser', e);
    res.statusCode = 400;
    res.write(responseError('Invalid format'));
  }
};

export { createUser, getAllUsers, getUserById };

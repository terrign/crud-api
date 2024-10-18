import { getAll, getById } from '@/models/user';
import { isValidId, type TController } from '@/types';
import { parseUrl, responseError } from '@/utils';

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

export { getAllUsers, getUserById };

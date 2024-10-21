import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const isDev = process.env.NODE_ENV === 'development';

const PROTOCOL = process.env.PROTOCOL;
const PORT = isTest ? process.env.TEST_PORT : isDev ? process.env.DEV_PORT : process.env.PORT;
const HOST = process.env.HOST;
const API_URL = `${PROTOCOL}://${HOST}:${PORT}`;

const USER_STORE_PATH = isTest
  ? new URL(`./db/${process.env.TEST_USERS_STORE_NAME}`, import.meta.url)
  : isDev
    ? new URL(`./db/${process.env.DEV_USERS__STORE_NAME}`, import.meta.url)
    : new URL(`./db/${process.env.USERS_STORE_NAME}`, import.meta.url);

export { API_URL, HOST, PORT, PROTOCOL, USER_STORE_PATH };

import type { IncomingMessage } from 'node:http';

import { API_URL } from '@/config';

const parseUrl = (req: IncomingMessage) => new URL(`${API_URL}${req.url}`);

const responseError = (error: string) => JSON.stringify({ error });

const readBody = async <T = unknown>(req: IncomingMessage): Promise<T> => {
  const body: Uint8Array[] = [];

  return new Promise((resolve, reject) => {
    req
      .on('data', (chunk: Uint8Array) => {
        body.push(chunk);
      })
      .on('end', () => {
        try {
          const parsedBody = JSON.parse(Buffer.concat(body).toString()) as T;
          resolve(parsedBody);
        } catch (error) {
          reject(error);
        }
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

export { parseUrl, readBody, responseError };

import type { IncomingMessage } from 'node:http';

import { API_URL } from '@/config';

const parseUrl = (req: IncomingMessage) => new URL(`${API_URL}${req.url}`);

const responseError = (error: string) => JSON.stringify({ error });

export { parseUrl, responseError };

import { createServer } from 'node:http';

import { API_URL, PORT } from '@/config';
import { getController } from '@/controllers';
import { parseUrl, responseError } from '@/utils';

const server = createServer(async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const controller = getController(parseUrl(req).pathname, req.method);

    if (controller) {
      await controller(req, res);

      return;
    }

    res.statusCode = 404;
    res.write(responseError('Invalid request'));
  } catch (e) {
    console.error('createServer', e);
    res.statusCode = 500;
  } finally {
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server url: ${API_URL}`);
});

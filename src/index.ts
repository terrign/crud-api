import { createServer } from 'node:http';

import { PORT } from '@/config';
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
    res.write(responseError('Invalid route'));
  } catch (e) {
    console.error(e);
    res.statusCode = 500;
  } finally {
    res.end();
  }
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

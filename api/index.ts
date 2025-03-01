import { createServer } from 'http';
import { parse } from 'url';
import app from '../server';

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url || '/', true);
  req.url = parsedUrl.pathname || '/';
  app(req, res);
});

export default server;

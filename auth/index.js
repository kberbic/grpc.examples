/* eslint-disable no-console */

import fs from 'fs';
import path from 'path';
import projectName from 'project-name';
import grpcjs from '@grpc/grpc-js';
import GRPCServer from './server/grpc.js';
import GRPCClient from './server/client.js';
import HttpServer from './server/rest.js';
import jwt from './providers/jwt.js';
import services from './services/index.js';
import models from './models/index.js';
import correlation from './modules/correlation.js';
import logger from './logger.js';

const dotenv = await import('dotenv');
process.env.NODE_ENV = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) });

const PUBLIC = [
  '/authService/register',
  '/authService/login',
];

const IS_EXEC_PATH = import.meta.url.indexOf(path.resolve()) !== -1;
class Server {
  #server = null

  #http = null;

  #grpc = null;

  constructor(server) {
    this.#server = server || new grpcjs.Server();
  }

  async start() {
    this.#grpc = new GRPCServer({
      modules: [correlation, jwt(PUBLIC)],
      port: process.env.PORT,
      host: '0.0.0.0',
      server: this.#server,
      services,
    });

    if (!IS_EXEC_PATH) return { grpc: this.#grpc, models };

    let routes = await this.mono();
    this.#http = new HttpServer({
      port: Number(process.env.PORT) + 1,
    });

    models.init()
        .then(() => this.#grpc.start())
        .then(async () => {
          routes = this.#grpc.routes.concat(routes);
          process.client = await (new GRPCClient(routes)).load();
          return this.#http.start(routes, process.client);
        })
        .then(() => logger.info(`${projectName()} STARTED`))
        .catch(logger.error);

    return { grpc: this.#grpc, models };
  }

  async mono() {
    const [mono] = process.argv.slice(2);
    if (mono !== 'mono') return [];

    if (!process.env.MICROSERVICES) return [];

    const currentPath = import.meta.url;
    const paths = process.env.MICROSERVICES.split(' ')
        .filter((x) => !currentPath.endsWith(`/${x}/index.js`));

    let routes = [];
    const servers = await Promise.all(paths.map(async (x) => import(`../${x}/index.js`)));

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < servers.length; i++) {
      const ChildServer = servers[i].default;
      if (ChildServer.name === Server.name) {
        // eslint-disable-next-line no-await-in-loop,no-shadow
        const { grpc, models } = await (new ChildServer(this.#server)).start();
        grpc.attach();
        // eslint-disable-next-line no-await-in-loop
        await models.init();
        routes = routes.concat(grpc.routes);
      }
    }
    return routes;
  }
}

if (IS_EXEC_PATH) new Server().start();

export default Server;

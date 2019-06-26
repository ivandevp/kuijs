const http = require('http');
const { compose } = require('./util');

module.exports = class Kui {
  constructor() {
    this.middlewares = [];
    this.context = {};
  }

  use(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Middleware should be a function');
    }

    this.middlewares.push(fn);

    return this;
  }

  createContext(req, res) {
    const context = this.context;
    context.request = context.req = req;
    context.response = context.res = res;
    return context;
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
      .then(() => this.handleResponse(ctx))
      .catch(this.handleError);
  }

  handleResponse(ctx) {
    ctx.res.end(ctx.body);
  }

  handleError(error) {
    console.error(error);
    this.context.res.end('Internal server error');
  }

  callback() {
    const fn = compose(this.middlewares);

    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
};

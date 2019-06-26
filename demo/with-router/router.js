function Router() {
  this.paths = {};
  this.methods = ['GET'];
}

Router.prototype.get = function(path, cb) {
  this.paths = {
    ...this.paths,
    [path]: {
      method: 'GET',
      action: cb
    }
  };
};

Router.prototype.routes = function() {
  return (ctx, next) => {
    const currentPath = this.paths[ctx.req.url];
    if (currentPath && currentPath.method === ctx.req.method) {
      currentPath.action(ctx, next);
    }
  };
};

module.exports = Router;

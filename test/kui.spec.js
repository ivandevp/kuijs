const http = require('http');
const Kui = require('../src/index');

jest.mock('http');

describe('Kui.js', () => {
  it('should be an instantiable class', () => {
    const app = new Kui();
    expect(typeof Kui).toBe('function');
    expect(app instanceof Kui).toBe(true);
  });

  describe('#use()', () => {
    it('should have a use method', () => {
      const app = new Kui();
      expect(app.use).toBeDefined();
      expect(typeof app.use).toBe('function');
    });

    it('should throw an error when argument passed is not a function', () => {
      const app = new Kui();
      const middleware = 'middleware';
      const useMiddleware = app.use.bind(null, middleware);
      expect(useMiddleware).toThrow();
      expect(useMiddleware).toThrow(/Middleware should be a function/);
    });

    it('should add the function to middleware queue', () => {
      const app = new Kui();
      const middleware = () => {};
      app.use(middleware);

      expect(app.middlewares.length).toBe(1);
      expect(app.middlewares).toContain(middleware);
      expect(app.middlewares[0]).toBe(middleware);

      const middleware2 = () => {};
      app.use(middleware2);

      expect(app.middlewares.length).toBe(2);
      expect(app.middlewares).toContain(middleware2);
      expect(app.middlewares[1]).toBe(middleware2);
    });

    it('should return the same instance of Kui application', () => {
      const app = new Kui();
      const appWithMiddlewares = app.use(() => {});

      expect(app).toBe(appWithMiddlewares);
    });
  });

  describe('#listen()', () => {
    it('should have a listen method', () => {
      const app = new Kui();
      expect(app.listen).toBeDefined();
      expect(typeof app.listen).toBe('function');
    });

    it('should create an http.Server instance', () => {
      const listenMock = jest.fn(http.Server.listen);
      http.createServer.mockReturnValue({
        listen: listenMock
      });

      const app = new Kui();
      const port = 1234;
      app.listen(port);

      expect(listenMock.mock.calls.length).toBe(1);
      expect(listenMock.mock.calls[0][0]).toBe(port);
    });
  });
});

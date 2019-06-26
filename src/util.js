exports.compose = fns => {
  return (ctx, next) => {
    return recursive(0);

    function recursive(index) {
      let fn = fns[index];

      if (index === fns.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(fn(ctx, recursive.bind(null, index + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
};

module.exports = {
  compose: exports.compose
};

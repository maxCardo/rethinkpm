var useUnless = function(middleware, paths) {
  return function(req, res, next) {
      if (paths.includes(req.path)) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};

module.exports = useUnless;
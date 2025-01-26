const myLogger = function (req, res, next) {
  console.log({ Request: req.url });
  console.log({ reqTime: Date.now() });
  next();
};

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();

  next();
};

export { myLogger, requestTime };

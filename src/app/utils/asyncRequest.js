const asyncRequest = (asyncFn, req, res, next) =>
  asyncFn(req, res).catch(err => next(err));

module.exports = asyncRequest;

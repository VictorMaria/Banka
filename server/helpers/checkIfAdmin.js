const checkIfAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send({ status: 403, error: 'Unauthourised!' });
  return next();
};
export default checkIfAdmin;

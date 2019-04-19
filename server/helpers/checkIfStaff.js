const checkIfStaff = (req, res, next) => {
  if (!req.user.isStaff) return res.status(403).send({ status: 403, error: 'Unauthourised!' });
  return next();
};

export default checkIfStaff;

const checkIfAdmin = (req, res, next) => {
  if (!req.user.is_admin) return res.status(401).send({ status: 401, error: 'Unauthorized!' });
  return next();
};
export default checkIfAdmin;

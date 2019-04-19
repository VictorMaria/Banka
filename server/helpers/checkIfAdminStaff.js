const checkIfAdminStaff = (req, res, next) => {
  if (!req.user.isStaff && !req.user.isAdmin) return res.status(403).send({ status: 403, error: 'Unauthourised!' });
  return next();
};
export default checkIfAdminStaff;

const checkIfAdminStaff = (req, res, next) => {
  if (!req.user.is_staff && !req.user.is_admin) return res.status(403).send({ status: 403, error: 'Unauthourised!' });
  return next();
};
export default checkIfAdminStaff;

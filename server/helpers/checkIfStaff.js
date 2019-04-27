const checkIfStaff = (req, res, next) => {
  if (!req.user.is_staff) {
    return res.status(401).send({ status: 401, error: 'You are not authorized to perform this action' });
  }
  return next();
};

export default checkIfStaff;

import Joi from 'joi';

const validator = schema => (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).send({ status: 400, error: result.error.details[0].message });
  }
  return next();
};

export default validator;

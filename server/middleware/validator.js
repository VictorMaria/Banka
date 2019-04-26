import Joi from 'joi';

const validator = schema => async (req, res, next) => {
  try {
    const result = await Joi.validate(req.body, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    req.body = result;
    next();
  } catch (error) {
    const errors = error.details.map(item => item.message);
    res.status(400).send({ status: 400, error: errors });
  }
};
export default validator;

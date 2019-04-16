import Joi from 'joi';

const signInSchema = {
    email: Joi.string().email().required(), 
    password: Joi.string().required()
};
export default signInSchema;

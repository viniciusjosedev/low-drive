import joi from "joi";

export default joi
  .object()
  .keys({
    email: joi.string().email().required(),
    password: joi.string().min(4).required(),
    name: joi.string().min(3).required()
  })
  .required();

const Joi = require("joi");
const yapValidations = require("@yapsody/lib-validations");

module.exports = Joi.object().keys({
  firstname: yapValidations.name.required().label("First Name"),
  lastname: yapValidations.name.required().label("Last Name"),
  emailid: yapValidations.email.required().label("Email ID"),
  password: yapValidations.password.required().label("Password"),
});
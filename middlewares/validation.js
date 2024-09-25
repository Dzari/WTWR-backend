const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (!validator.isEmail(value)) {
    return helpers.message('The "email" field must be a valid email');
  }
  return value;
};

const validateisHexadecimal = (value, helpers) => {
  if (!validator.isHexadecimal(value) || value.length !== 24) {
    return helpers.message(
      'The "id" must be a valid 24-character hexadecimal string'
    );
  }
  return value;
};

//Validation for Add clothing item body
const validateClothingItemBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
    weather: Joi.string().required().messages({
      "string.empty": 'The "weather" field must be filled in',
    }),
  }),
});

//Validator for User creation body
const validateUserInfoBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    email: Joi.string()
      .required()
      .custom(validateEmail)
      .messages({ "string.empty": 'The "email" field must be filled in' }),
  }),
  password: Joi.string().required().min(8).messages({
    "string.min": 'The minimum length of the "name" field is 8',
    "string.empty": 'The "name" field must be filled in',
  }),
  avatarUrl: Joi.string().required.custom(validateURL).messages({
    "string.empty": 'The "name" field must be filled in',
    "string.uri": 'The "avatar URL" field must be a valid url',
  }),
});

//Validation for user Login body
const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

//Validation for user ID from URL parameters (24-character hexadecimal)
const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateisHexadecimal).messages({
      "string.empty": 'The "id" field must be filled in',
    }),
  }),
});

module.exports = {
  validateClothingItemBody,
  validateUserInfoBody,
  validateLoginBody,
  validateId,
};

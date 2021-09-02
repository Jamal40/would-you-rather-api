const Joi = require("@hapi/joi");

// Register vaildation
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    avatarURL: Joi.string(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

//Question Validation
const questionValidation = (data) => {
  const schema = Joi.object({
    author: Joi.string().required(),
    optionOne: Joi.string().required(),
    optionTwo: Joi.string().required(),
  });
  return schema.validate(data);
};

//Answer Validation
const answerValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    questionId: Joi.string().required(),
    answer: Joi.number().max(2).min(1).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.questionValidation = questionValidation;
module.exports.answerValidation = answerValidation;

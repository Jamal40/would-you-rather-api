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
    timestamp: Joi.data().required(),
    optionOne: Joi.string().required(),
    optionTwo: Joi.string().required(),
  });
};

//Answer Validation
const answerValidation = (data) => {
  const schema = Joi.Object({
    userId: Joi.string().required(),
    questionId: Joi.string().required(),
    answer: Joi.number().max(2).min(1).required(),
  });
};

module.exports.registerValidation = registerValidation;
module.exports.questionValidation = questionValidation;

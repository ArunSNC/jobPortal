/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const Joi = require('joi');
const Utilservice = require('../services/Utilservice');

module.exports = {

  /**
   * `UserController.signup()`
   */
  signup: async  (req, res) => {

    try {
        const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });

      const params = schema.validate(req.allParams());
      const encryptPassword = await Utilservice.hashedPassword(params.value.password);

      const registered = await User.create({
        email: params.value.email,
        password: encryptPassword
      }).fetch();

      return res.ok(registered);

    } catch (error) {
     return error.name == 'ValidationError' ? res.badRequest(error.details[0].message) : res.serverError(error);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async (req, res) => {

    try {
      const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      });

      const params  = schema.validate(req.allParams());
      const user  = await User.findOne({
        email: params.value.email
      });

      if(!user) return res.notFound({message: 'user not found', success: false});

      const matchedPassword = await Utilservice.comparePassword(params.value.password, user.password);

      if(!matchedPassword) return res.badRequest({message: 'Unauthorized', success: false});

      const token = JWTservice.issuer({user: user.id},'1 days');

      return res.ok(token)
    } catch (error) {
      return res.serverError(error);
    }
  }

};


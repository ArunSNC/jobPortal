/**
 * Company.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  // datastore: 'mongodb',

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    city:{
      type: 'string',
      required: true
    },
    address:{
      type: 'string'
    },

    jobs: {
      collection: 'Job',
      via: 'company'
    },

    user: {
      model: 'user',
      columnName: 'userId',
      required: true
    }
  }

};


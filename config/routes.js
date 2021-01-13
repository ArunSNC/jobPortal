/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */


module.exports.routes = {

    //Company
    'POST /company': 'CompanyController.create',
    'GET /company' : 'CompanyController.find',
    'GET /company/:id' : 'CompanyController.findOne',
    'PATCH /company/:id' : 'CompanyController.update',
    'DELETE /company/:id': 'CompanyController.delete',


    // Jobs
    'POST /jobs' : 'JobController.create',
    'GET /jobs' : 'JobController.find',


    // Application
    'POST /application' : 'ApplicationController.create',
    'GET /application' : 'ApplicationController.find',

    //Users
    'POST /user/login' : 'UserController.login',
    'POST /user/signup': 'UserController.signup',
};

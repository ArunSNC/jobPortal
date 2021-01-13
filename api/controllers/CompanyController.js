/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {

        let params = req.allParams();
        if(!params.name){
            return res.badRequest({err: 'name field is required'})
        }

        try {
            let saved = await Company.create({
                name: params.name,
                city: params.city,
                address: params.address,
                user: req.user
            });
            return res.ok({message : "saved to database!"});
        } catch (error) {
            return res.send(error).status(400);
        }
    },


    find: async (req, res) => {

        try {
            let found = await Company.find().populate('jobs');
            return res.ok(found);
        } catch (error) {
            return res.sendError(error)
        }
    },


    findOne: async (req, res) => {

        try {
            let foundOne = await Company.findOne({
                id: req.params.id
            }).populate('jobs');

            return res.ok(foundOne);
        } catch (error) {
            return res.sendError(error);
        }
    },

    update: async (req , res) => {

        try {

            let params = req.allParams();
            let attributes = {};

            if(params.name) attributes.name = params.name;
            if(params.city) attributes.city = params.city;
            if(params.address) attributes.address = params.address;

            const updated = await Company.update({
                id: req.params.id
            }, attributes);

            return res.ok(updated);

        } catch (error) {
            return res.sendError(error);
        }
    },

    delete: async (req, res) => {
        
        try {
            const deleted = await Company.destroy({
                id: req.params.id
            });

            res.ok(deleted)
        } catch (error) {
            return res.sendError(error);
        }
    }

};


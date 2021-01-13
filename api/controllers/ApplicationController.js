/**
 * ApplicationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async (req, res) => {

        try {
            const { name, email, jobId } = req.allParams();

            if(!name)  return res.badRequest({message: 'Name  field is empty', success: false});
            if(!email) return res.badRequest({message: 'Email field is empty', success: false});
            if(!jobId) return res.badRequest({message: 'JobId field is empty', success: false});

            const applicant = await Candidate.create({
                name,email
            }).fetch();

            console.log(applicant.id)
            const app = await Application.create({
                job: jobId,
                candidate: applicant.id
            }).fetch();

            res.ok(app);
        } catch (error) {
            res.sendError(error);
        }
    },

    find: async(req, res) => {
        try {
            let applications = await Application.find().populate('job').populate('candidate');
            return res.ok(applications);
        } catch (error) {
            return res.sendError(error);
        }
    }

};


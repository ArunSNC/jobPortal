/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {


  /**
   * `JobController.create()`
   */
  create: async  (req, res) => {

    try {
      let {title, description, salary, position, companyId} = req.allParams();

      const JobDetail = await JobDetails.create({
        description,salary,position
      }).fetch();

      const JobCreated = await Job.create({
        title,
        jobDetails: JobDetail.id,
        company: companyId
      }).fetch();

      return res.ok(JobCreated);
    } catch (error) {
      return res.sendError(error);
    }
  },

  /**
   * `JobController.find()`
   */
  find: async  (req, res) => {

    try {
      let jobs = await Job.find().populate('jobDetails').populate('company');

      // let jobs = await Job.find({where:{title: 'software Developer'}}).populate('jobDetails');

      return res.ok(jobs);
    } catch (error) {
      return res.badRequest(error);
    }
  }

};


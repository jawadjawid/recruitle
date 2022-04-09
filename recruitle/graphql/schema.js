// package imports
const { v4: uuidv4 } = require("uuid");
const graphqljson = require('graphql-type-json');
const {GraphQLJSON} = graphqljson;
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require('lodash');
const mongoose = require('mongoose');
// project imports
const Applicant = require('../database/models/applicant');
const Employer = require('../database/models/employer');
const Job = require('../database/models/job');
const Application = require('../database/models/application');
const Interview = require('../database/models/interview');

const ApplicantType = new GraphQLObjectType({
  name: 'Applicant',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    resume: { type: GraphQLJSON },
  })
});

const EmployerType = new GraphQLObjectType({
  name: 'Employer',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    companyName: { type: GraphQLString }
  })
});

const Count = new GraphQLObjectType({
  name: 'Count',
  fields: () => ({
    value: { type: GraphQLInt },
  })
});

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    companyName: { type: GraphQLString },
    salary: { type: GraphQLInt },
    currency: { type: GraphQLString },
    location: { type: GraphQLString },
    desc: { type: GraphQLString },
    applied: { type: GraphQLBoolean }
  })
});

const JobInfoType = new GraphQLObjectType({
  name: 'JobInfo',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    companyName: { type: GraphQLString },
    salary: { type: GraphQLInt },
    currency: { type: GraphQLString },
    location: { type: GraphQLString },
    desc: { type: GraphQLString }
  })
});

const InterviewType = new GraphQLObjectType({
  name: 'Interview',
  fields: () => ({
    id: { type: GraphQLID },
    employerId: { type: GraphQLID },
    applicantId: { type: GraphQLID },
    jobId: { type: GraphQLID },
    date: { type: GraphQLString },
    roomName: { type: GraphQLString }
  })
});

const InterviewInfoType = new GraphQLObjectType({
  name: 'InterviewInfo',
  fields: () => ({
    id: { type: GraphQLID },
    employerId: {type: EmployerType},
    applicantId: { type: ApplicantType },
    jobId: { type: JobInfoType },
    date: { type: GraphQLString },
    roomName: { type: GraphQLString }
  })
});

const ApplicationType = new GraphQLObjectType({
  name: 'Application',
  fields: () => ({
    applicantId: { type: GraphQLID },
    jobId: { type: GraphQLID }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType', 
  fields: {
    applicant: {
      type: ApplicantType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Applicant.findOne({"_id": args.id})
      }
    },
    employer: {
      type: EmployerType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return Employer.findOne({"_id": args.id})
      }
    },
    jobCount: {
      type: Count,
      args: { filter: { type: GraphQLString }},
      resolve(parent, args) {
        if (args.filter == null) {
          return {"value": Job.countDocuments({})}
        } else {
          const regex = new RegExp(args.filter.replaceAll('+', ' '), 'i');
          return {"value":Job.countDocuments({ $or: [{ title: {$regex: regex} }, { companyName: {$regex: regex} }, { location: {$regex: regex} }, { desc: {$regex: regex} }] })}
        }
      }
    },
    jobs: {
      type: new GraphQLList(JobType),
      args: {
        applicantId: { type: GraphQLID },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        filter: { type: GraphQLString }
      },
      async resolve(parent, args) {
        var jobs = null;
        if (args.filter == null) {
          jobs = await Job.find({}).sort({createdAt: -1}).skip(args.offset).limit(args.first);
        } else {
          const regex = new RegExp(args.filter.replaceAll('+', ' '), 'i');
          jobs = await Job.find({ $or: [{ title: {$regex: regex} }, { companyName: {$regex: regex} }, { location: {$regex: regex} }, { desc: {$regex: regex} }] })
          .sort({createdAt: -1}).skip(args.offset).limit(args.first);
        }
        const res = jobs.map(async job => {
          let applied = await Application.exists({applicantId: mongoose.Types.ObjectId(args.applicantId), jobId: mongoose.Types.ObjectId(job.id)});
          return {
            id: job.id,
            title: job.title,
            companyName: job.companyName,
            salary: job.salary,
            currency: job.currency,
            location: job.location,
            desc: job.desc,
            applied: applied
        }});
        return res;
      }
    },
    postings: {
      type: new GraphQLList(JobType),
      args: {
        companyId: { type: GraphQLID },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const employer = await Employer.findOne({"_id": args.companyId});
        var jobs = null;
        jobs = await Job.find({"companyName": employer.companyName}).sort({createdAt: -1}).skip(args.offset).limit(args.first);
        const res = jobs.map(async job => {
          return {
            id: job.id,
            title: job.title,
            companyName: job.companyName,
            salary: job.salary,
            currency: job.currency,
            location: job.location,
            desc: job.desc
        }});
        return res;
      }
    },
    postingsCount: {
      type: Count,
      args: {
        companyId: { type: GraphQLID }
      },
      async resolve(parent, args) {
        const employer = await Employer.findOne({"_id": args.companyId});
        var jobs = null;
        jobs = await Job.find({"companyName": employer.companyName}).sort({createdAt: -1});
        const res = jobs.map(async job => {
          return {
            id: job.id,
            title: job.title,
            companyName: job.companyName,
            salary: job.salary,
            currency: job.currency,
            location: job.location,
            desc: job.desc
        }});
        if (jobs != null) {
          return {value: res.length};
        } 
        return {value: 0}
      }
    },
    applications: {
      type: new GraphQLList(JobType),
      args: {
        applicantId: { type: GraphQLID },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        var apps = null;
        apps = await Application.find({"applicantId": args.applicantId}).sort({createdAt: -1}).skip(args.offset).limit(args.first).populate("jobId");
        const res = apps.map(async app => {
          return {
            id: app.jobId.id,
            title: app.jobId.title,
            companyName: app.jobId.companyName,
            salary: app.jobId.salary,
            currency: app.jobId.currency,
            location: app.jobId.location,
            desc: app.jobId.desc
        }});
        return res;
      }
    },
    applicationsCount: {
      type: Count,
      args: {
        applicantId: { type: GraphQLID }
      },
      async resolve(parent, args) {
        var apps = null;
        apps = await Application.find({"applicantId": args.applicantId}).sort({createdAt: -1}).populate("jobId");
        const res = apps.map(async app => {
          return {
            id: app.jobId.id,
            title: app.jobId.title,
            companyName: app.jobId.companyName,
            salary: app.jobId.salary,
            currency: app.jobId.currency,
            location: app.jobId.location,
            desc: app.jobId.desc
        }});
        if (apps != null) {
          return {value: res.length};
        } 
        return {value: 0}
      }
    },
    applicants: {
      type: new GraphQLList(ApplicantType),
      args: {
        jobId: { type: GraphQLID },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        var apps = null;
        apps = await Application.find({"jobId": args.jobId}).sort({createdAt: -1}).skip(args.offset).limit(args.first).populate("applicantId");
        const res = apps.map(async app => {
          return {
            id: app.applicantId.id,
            firstName: app.applicantId.firstName,
            lastName: app.applicantId.lastName,
            email: app.applicantId.email,
            resume: app.applicantId.resume,
        }});
        return res;
      }
    },
    applicantsCount: {
      type: Count,
      args: {
        jobId: { type: GraphQLID }
      },
      async resolve(parent, args) {
        var apps = null;
        apps = await Application.find({"jobId": args.jobId}).sort({createdAt: -1}).populate("applicantId");
        const res = apps.map(async app => {
          return {
            id: app.applicantId.id,
            firstName: app.applicantId.firstName,
            lastName: app.applicantId.lastName,
            email: app.applicantId.email,
            resume: app.applicantId.resume,
        }});
        if (apps != null) {
          return {value: res.length};
        } 
        return {value: 0}
      }
    },
    applicationExists: {
      type: GraphQLBoolean,
      args: {
        applicantId: {type: GraphQLID},
        jobId: {type: GraphQLID}
      },
      resolve(parent, args) {
        return Application.exists({applicantId: args.applicantId, jobId: args.jobId});
      }
    },
    resumeExists: {
      type: GraphQLBoolean,
      args: { id: {type: GraphQLID} },
      async resolve(parent, args) {
        const applicant = await Applicant.findOne({"_id": args.id});
        return applicant.resume.get("originalname") != "No resume on file!";
      }
    },
    interviews: {
      type: new GraphQLList(InterviewInfoType),
      args: { id: {type: GraphQLID} },
      async resolve(parents, args) {
        var interviews = await Interview.find({applicantId: args.id}).populate("applicantId").populate("employerId").populate("jobId");
        if(interviews.length == 0) {
          interviews = await Interview.find({employerId: args.id}).populate("applicantId").populate("employerId").populate("jobId");
        }
        return interviews;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createJob: {
      type: JobType,
      args: {
        title: { type: GraphQLString },
        companyName: { type: GraphQLString },
        salary: { type: GraphQLInt },
        currency: { type: GraphQLString },
        location: { type: GraphQLString },
        desc: { type: GraphQLString }
      },
      resolve(parent, args) {
        let job = new Job({
          title: args.title,
          companyName: args.companyName,
          salary: args.salary,
          currency: args.currency,
          location: args.location,
          desc: args.desc
        });
        return job.save();
      }
    },
    updateApplicant: {
      type: ApplicantType,
      args: {
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve(parent, args) {
        Applicant.findOne({"_id": args.id}, function(err, applicant) {
          if(args.firstName !== undefined) {
            applicant.firstName = args.firstName;
          }
          if(args.lastName !== undefined) {
            applicant.lastName = args.lastName;
          }
          return applicant.save();
        });
      }
    }, 
    updateEmployer: {
      type: EmployerType,
      args: {
        id: { type: GraphQLID },
        companyName: { type: GraphQLString },
      },
      resolve(parent, args) {
        Employer.findOne({"_id": args.id}, function(err, employer) {
          employer.companyName = args.companyName;
          return employer.save();
        });
      }
    },
    requestInterview: {
      type: InterviewType,
      args: {
        employerId: { type: GraphQLID },
        applicantId: { type: GraphQLID },
        jobId: { type: GraphQLID },
        date: { type: GraphQLString }
      },
      resolve(parent, args) {
        let interview = new Interview({
          employerId: args.employerId,
          applicantId: args.applicantId,
          jobId: args.jobId,
          date: args.date,
          roomName: uuidv4()
        });
        return interview.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
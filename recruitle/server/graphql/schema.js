// package imports
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
// project imports
const Applicant = require('../database/models/applicant');
const Employer = require('../database/models/employer');
const Job = require('../database/models/job');
const Application = require('../database/models/application');

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

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    companyName: { type: GraphQLString },
    salary: { type: GraphQLInt },
    currency: { type: GraphQLString },
    location: { type: GraphQLString }
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
    jobs: {
      type: new GraphQLList(JobType),
      resolve(parent, args) {
        return Job.find({});
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
        location: { type: GraphQLString }
      },
      resolve(parent, args) {
        let job = new Job({
          title: args.title,
          companyName: args.companyName,
          salary: args.salary,
          currency: args.currency,
          location: args.location
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
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
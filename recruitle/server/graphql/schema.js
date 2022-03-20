// package imports
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
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

const ApplicantType = new GraphQLObjectType({
  name: 'Applicant',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
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
    location: { type: GraphQLString }
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
        return Job.findOne({})
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
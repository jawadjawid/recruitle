// import React, { useState } from 'react';
import { gql } from '@apollo/client';

const GET_APPLICANT = gql`
  query ($id: ID) {
    applicant(id: $id) {
      id
      firstName
      lastName
      email
      resume
    }
  }
`;

const GET_APPLICATIONS = gql`
  query ($applicantId: ID) {
    applications(id: $applicantId) {
      title
      companyName
      salary
      currency
      location
      desc
    }
  }
`;

const GET_EMPLOYER = gql`
  query ($id: ID) {
    employer(id: $id) {
      id
      companyName
      email
    }
  }
`;

const GET_JOBS = gql`
query Jobs($applicantId: ID, $first: Int, $offset: Int, $filter: String) {
  jobs(applicantId: $applicantId, first: $first, offset: $offset, filter: $filter) {
    id
    title
    location
    companyName
    salary
    currency
    desc
    applied
  }
}
`;

const GET_JOBS_COUNT = gql`
query JobCount($filter: String) {
  jobCount(filter: $filter){
    value
  }
}
`;

const CREATE_JOB = gql`
  mutation ($title: String!, $companyName: String!, $salary: Int!, $currency: String!, $location: String!, $desc: String) {
    createJob(title: $title, companyName: $companyName, salary: $salary, currency: $currency, location: $location, desc: $desc) {
      id
    }
  }
`;

const UPDATE_APPLICANT = gql`
  mutation ($id: ID!, $firstName: String, $lastName: String) {
    updateApplicant(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_EMPLOYER = gql`
  mutation ($id: ID!, $companyName: String!) {
    updateEmployer(id: $id, companyName: $companyName) {
      id
      companyName
    }
  }
`;

const APPLICATION_EXISTS = gql`
  query ($applicantId: ID, $jobId: ID) {
    applicationExists(applicantId: $applicantId, jobId: $jobId)
  }
`;

const RESUME_EXISTS = gql`
  query ($id: ID) {
    resumeExists(id: $id)
  }
`;

export { GET_APPLICANT, 
    GET_APPLICATIONS,
    GET_EMPLOYER,
    CREATE_JOB,
    GET_JOBS,
    UPDATE_APPLICANT,
    UPDATE_EMPLOYER,
    APPLICATION_EXISTS,
    RESUME_EXISTS,
    GET_JOBS_COUNT };

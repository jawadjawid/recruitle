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

const GET_APPLICANTS = gql`
  query ($jobId: ID, $first: Int, $offset: Int) {
    applicants(jobId: $jobId, first: $first, offset: $offset) {
      id
      firstName
      lastName
      email
      resume
    }
  }
`;

const GET_APPLICANTS_COUNT = gql`
  query ($jobId: ID) {
    applicantsCount(jobId: $jobId) {
      value
    }
  }
`;

const GET_APPLICATIONS = gql`
  query ($applicantId: ID, $first: Int, $offset: Int) {
    applications(applicantId: $applicantId, first: $first, offset: $offset) {
      id
      title
      companyName
      salary
      currency
      location
      desc
    }
  }
`;

const GET_APPLICATIONS_COUNT = gql`
  query ($applicantId: ID) {
    applicationsCount(applicantId: $applicantId) {
      value
    }
  }
`;

const GET_POSTINGS = gql`
  query ($companyId: ID, $first: Int, $offset: Int) {
    postings(companyId: $companyId, first: $first, offset: $offset) {
      id
      title
      companyName
      salary
      currency
      location
      desc
    }
  }
`;

const GET_POSTINGS_COUNT = gql`
  query ($companyId: ID) {
    postingsCount(companyId: $companyId) {
      value
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

const REQUEST_INTERVIEW = gql`
  mutation ($employerId: ID!, $applicantId: ID!, $jobId: ID!, $date: String!) {
    requestInterview(employerId: $employerId, applicantId: $applicantId, jobId: $jobId, date: $date) {
      id
    }
  }
`;

const GET_INTERVIEWS = gql`
  query($id: ID!) {
    interviews(id: $id) {
      id
      employerId {
        companyName
      }
      applicantId {
        firstName
        lastName
      }
      jobId {
        title
      }
      roomName
      date
    }
  }
`;

export { GET_APPLICANT, 
    GET_APPLICANTS,
    GET_APPLICANTS_COUNT,
    GET_APPLICATIONS,
    GET_APPLICATIONS_COUNT,
    GET_POSTINGS,
    GET_POSTINGS_COUNT,
    GET_EMPLOYER,
    CREATE_JOB,
    GET_JOBS,
    UPDATE_APPLICANT,
    UPDATE_EMPLOYER,
    APPLICATION_EXISTS,
    RESUME_EXISTS,
    GET_JOBS_COUNT,
    REQUEST_INTERVIEW,
    GET_INTERVIEWS };

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
  query {
    jobs {
      id
      title
      location
      companyName
      salary
      currency
    }
  }
`;

const CREATE_JOB = gql`
  mutation ($title: String!, $companyName: String!, $salary: Int!, $currency: String!, $location: String!) {
    createJob(title: $title, companyName: $companyName, salary: $salary, currency: $currency, location: $location) {
      id
    }
  }
`;

export {GET_APPLICANT, GET_EMPLOYER, CREATE_JOB, GET_JOBS };
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
    companyName
    salary
    location
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

const GET_BOOKS = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

export { GET_BOOKS, GET_APPLICANT, GET_EMPLOYER, CREATE_JOB, GET_JOBS, UPDATE_APPLICANT, UPDATE_EMPLOYER };
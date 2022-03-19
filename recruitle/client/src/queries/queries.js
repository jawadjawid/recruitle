// import React, { useState } from 'react';
import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

const GET_APPLICANT = gql`
  query ($id: ID) {
    applicant(id: $id) {
      id
      firstName
      lastName
      email
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

const GET_AUTHORS = gql`
  query getBooksQuery {
    authors {
      name
      id
    }
  }
`;

const ADD_BOOK = gql`
  mutation ($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export { GET_BOOKS, GET_APPLICANT, GET_EMPLOYER, GET_AUTHORS, ADD_BOOK };
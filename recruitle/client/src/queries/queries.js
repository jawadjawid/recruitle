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

const GET_USER = gql`
  query ($id: ID) {
    user(id: $id) {
      id
      firstName
      lastName
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

export { GET_BOOKS, GET_USER, GET_AUTHORS, ADD_BOOK };
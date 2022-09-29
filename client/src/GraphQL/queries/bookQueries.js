import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    books {
      name
      id
    }
  }
`;

const GET_BOOK = gql`
  query GetBook($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export { GET_BOOKS, GET_BOOK };

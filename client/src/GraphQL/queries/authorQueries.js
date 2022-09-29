import { gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      name
      id
    }
  }
`;

export { GET_AUTHORS };

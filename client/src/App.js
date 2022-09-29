import React, { Component } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// Initialize ApolloClient / Apollo client setup
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1> Dayan's Reading List (GraphQL with Apollo Client)</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_BOOKS } from '../GraphQL/queries/bookQueries';
import BookDetails from './BookDetails';

const BookList = () => {
  const [selectedBook, setSelectedBook] = useState('');

  // make query to GraphQL server to get books list
  const { loading, error, data } = useQuery(GET_BOOKS);
  // console.log(data);

  const displayBooks = () => {
    if (loading) return <p>Loading books...</p>;
    else if (data) {
      const { books } = data;
      if (books) {
        {
          return books.map(({ id, name }) => (
            <li
              key={id}
              onClick={(event) => {
                setSelectedBook(id);
              }}
            >
              {name}
            </li>
          ));
        }
      }
    } else if (error) return <p> Something went wrong!</p>;
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default BookList;

import { useQuery } from '@apollo/client';

import { GET_BOOK } from '../GraphQL/queries/bookQueries';

const BookDetails = ({ bookId }) => {
  // make query to GraphQL server to get book details
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id: bookId },
  });

  // function to display book details
  const displayBookDetails = () => {
    if (loading) return <p>Loading book details...</p>;
    else if (!bookId) {
      return <div>No book selected</div>;
    } else if (data) {
      const { book } = data;
      if (book) {
        return (
          <div>
            <h2> {book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>
            <p>All books by this author:</p>
            <ul className="other-books">
              {book.author.books.map((item) => {
                return <li key={item.id}>{item.name}</li>;
              })}
            </ul>
          </div>
        );
      }
    } else if (error) return <p> Something went wrong!</p>;
  };

  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;

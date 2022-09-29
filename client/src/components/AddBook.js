import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { GET_AUTHORS } from '../GraphQL/queries/authorQueries';
import { ADD_BOOK } from '../GraphQL/mutations/bookMutations';
import { GET_BOOKS } from '../GraphQL/queries/bookQueries';

const AddBook = () => {
  // set state for form elements
  const [bookName, setBookName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  // make query to GraphQL server to get authors list
  const { loading, error, data } = useQuery(GET_AUTHORS);

  // make mutation query to GraphQL server to add book to book list
  const [addBook] = useMutation(ADD_BOOK, {
    variables: { name: bookName, genre: genre, authorId: authorId },
    refetchQueries: [{ query: GET_BOOKS }],
  });

  // console.log(data);

  // display list of authors
  const displayAuthor = () => {
    if (loading) return <option disabled>Loading authors</option>;
    else if (data) {
      const { authors } = data;
      if (authors) {
        return authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ));
      }
    } else if (error) return <option disabled>Something went wrong!</option>;
  };

  // handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // check for empty values
    if (bookName === '' || genre === '' || authorId === '') {
      return alert('Please fill in all fields.');
    }
    // console.log(`bookName: ${bookName}, genr: ${genre}, AuthorId: ${authorId}`);
    // call to addBook mutation
    addBook(bookName, genre, authorId);

    // reset values
    setBookName('');
    setGenre('');
    setAuthorId('');
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          name="bookName"
          value={bookName}
          onChange={(event) => setBookName(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(event) => setAuthorId(event.target.value)}>
          <option>Select author</option>
          {displayAuthor()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};
export default AddBook;

import React from "react";
import { Link } from 'react-router-dom'; // Importing the Link component from react-router-dom
import Book from "./Book"; // Importing the Book component for displaying individual books

// Define the SearchPage component for displaying the search page content
const SearchPage = ({ searchResults, search, handleInputChange, updateBookShelf }) => {
  return (
    <div className="search-books">
      <div className="search-books-bar">
        {/* Create a link to navigate back to the main page */}
        <Link className="close-search" to="/">
          close
        </Link>
        <div className="search-books-input-wrapper">
          {/* Create an input field for searching by title */}
          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={handleInputChange} // Call handleInputChange function when the input changes
          />
        </div>
      </div>
      <div className="search-books-results">
        {console.log(searchResults)} {/* Log the search results to the console */}
        <ol className="books-grid">
          {/* Map through searchResults and render Book component for each book */}
          {searchResults.map((book) => (
            <Book
              key={book.id} // Use book ID as the key for React's efficient rendering
              book={book} // Pass the book data as a prop to Book component
              updateBookShelf={updateBookShelf} // Pass the updateBookShelf function to Book component
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SearchPage;

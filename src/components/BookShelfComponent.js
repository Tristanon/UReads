import React from "react";
import Book from "./Book.js"; // Importing the Book component for displaying individual books

// Define the BookShelfComponent component for displaying a single bookshelf
const BookShelfComponent = ({ books, title, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      {/* Display the title of the bookshelf */}
      <h2 className="bookshelf-title">{title}</h2>

      <div className="bookshelf-books">
        <ol className="books-grid">
          {/* Map through the array of books and render the Book component for each book */}
          {books.map((book) => (
            <li key={book.id}> {/* Use book ID as the key for React's efficient rendering */}
              {/* Render the Book component, passing the book and updateBookShelf function */}
              <Book book={book} updateBookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelfComponent;

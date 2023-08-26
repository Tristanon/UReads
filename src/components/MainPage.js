import React from "react";
import Shelves from "./Shelves"; // Importing the Shelves component to display bookshelves
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import Header from "./Header"; // Importing the Header component to display the page header

// Define the MainPage component that displays the main page content
const MainPage = ({ books, updateBookShelf }) => {
  return (
    <div className="list-books">
      {/* Display the page header using the Header component */}
      <Header />

      {/* Display the bookshelves content using the Shelves component */}
      <div className="list-books-content">
        <Shelves books={books} updateBookShelf={updateBookShelf} />
      </div>

      {/* Provide a link to navigate to the search page */}
      <div className="open-search">
        <Link to="/search">
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default MainPage;

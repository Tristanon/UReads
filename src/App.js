// Import necessary styles and libraries
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDebounce } from "use-debounce";

// Import custom components for different pages
import SearchPage from "./components/SearchPage";
import MainPage from "./components/MainPage";

// Import API functions for fetching and updating book data
import * as BookAPI from './BooksAPI';

function App() {
  // State variables to manage book data and search functionality
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [IdToBooks, setIdToBooks] = useState(new Map());
  const [debouncedSearch] = useDebounce(search, 500);

  // Fetch all books from the API when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Search for books based on the debounced search input
  useEffect(() => {
    searchBooks();
  }, [debouncedSearch]);

  // Fetch books from the API and create a map for efficient lookups
  const fetchBooks = async () => {
    try {
      const data = await BookAPI.getAll();
      const bookMap = new Map(data.map(book => [book.id, book]));
      setBooks(data);
      setIdToBooks(bookMap);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Search for books and update search results based on user input
  const searchBooks = async () => {
    try {
      if (debouncedSearch) {
        const data = await BookAPI.search(debouncedSearch);
        setSearchResults(data.error ? [] : mapSearchResults(data));
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  // Map search results to existing books for consistency
  const mapSearchResults = (searchData) =>
    searchData.map(book =>
      IdToBooks.has(book.id) ? IdToBooks.get(book.id) : book
    );

  // Handle user input change for the search bar
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  // Update the book shelf both in local state and on the server
  const updateBookShelf = (book, newShelf) => {
    const updatedBooks = books.map(b =>
      b.id === book.id ? { ...b, shelf: newShelf } : b
    );

    if (!IdToBooks.has(book.id)) {
      book.shelf = newShelf;
      updatedBooks.push(book);
      console.log(book);
    }

    setBooks(updatedBooks);
    BookAPI.update(book, newShelf);
  };

  // Return the JSX for the main application
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Render the Search Page component */}
          <Route path="/search" element={
            <SearchPage
              searchResults={searchResults}
              search={search}
              handleInputChange={handleInputChange}
              updateBookShelf={updateBookShelf}
            />
          } />
          {/* Render the Main Page component */}
          <Route path="/" element={
            <MainPage
              books={books}
              updateBookShelf={updateBookShelf}
            />
          } />
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component as the default export
export default App;

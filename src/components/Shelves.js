import React from "react";
import BookShelfComponent from "./BookShelfComponent"; // Importing the BookShelfComponent for displaying individual bookshelves

// Define the Shelves component that displays multiple bookshelves
const Shelves = ({ books, updateBookShelf }) => {
  // Define an array of shelf data, each containing title and shelf type
  const shelvesData = [
    { title: "Currently Reading", shelf: "currentlyReading" },
    { title: "Want To Read", shelf: "wantToRead" },
    { title: "Read", shelf: "read" },
  ];

  return (
    <div>
      {/* Map through the shelvesData array and render BookShelfComponent for each shelf */}
      {shelvesData.map((shelfData) => (
        <BookShelfComponent
          key={shelfData.shelf} // Use shelf type as the key for React's efficient rendering
          title={shelfData.title} // Pass the shelf title as a prop to BookShelfComponent
          // Filter books based on the shelf type and pass them to BookShelfComponent
          books={books.filter((book) => book.shelf === shelfData.shelf)}
          updateBookShelf={updateBookShelf} // Pass the updateBookShelf function to BookShelfComponent
        />
      ))}
    </div>
  );
};

export default Shelves;

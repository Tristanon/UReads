import React from "react";

const Book = ({ book, updateBookShelf }) => {
  const selectedShelf = book.shelf || "none";

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book?.imageLinks?.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={selectedShelf} // Use value instead of defaultValue
            onChange={(e) => updateBookShelf(book, e.target.value)}
          >
            <option value="none">None</option> {/* Always show the "None" option */}
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors && book.authors.map((author, index) => (
        <div className="book-authors" key={index}>
          {author}
        </div>
      ))}
    </div>
  );
};

export default Book;

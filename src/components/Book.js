import React from "react"

const Book = ({ book, updateBookShelf }) => {
  const selectedShelf = book.shelf || "none";

  return (
      <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:  `url(${book?.imageLinks?.thumbnail})`,}}></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => updateBookShelf(book, e.target.value)}>
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">
                  Currently Reading
                </option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                { selectedShelf !== "none"  && <option value="none">None</option>}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.publisher}</div>
      </div>
  );
};

export default Book;

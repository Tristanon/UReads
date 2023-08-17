import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Shelves from "./components/Shelves";
import * as BookAPI from './BooksAPI';
import Book from "./components/Book";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { useDebounce } from "use-debounce";


function App() {
  
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);

  const [searchBook, setSearchBook] = useState([]);

  const [mergeBook, setMergeBook] = useState([]);

  const [mapOfIdToBooks, setMapOfIdToBooks] = useState(new Map());

  const handleInputChange = (event) => {
    const type = event.target.value;
    setSearch(type);
  }

  useEffect(() => {
    BookAPI.getAll().then(data => {
        setBooks(data)
        setMapOfIdToBooks(createMapOfBooks(data));
      });
  }, [])

  useEffect(() => {
    let isActive = true;

    if (value){
      BookAPI.search(value).then(data => {
        if (data.error) {
          setSearchBook([]);
        } else {
          if (isActive){
            console.log(data)
            setSearchBook(data);
          }
        }
      })
    }

    return () => {
      isActive = false;
      setSearchBook([])
      console.log("Unmount", search);
    }
  }, [value]);

  useEffect(() => {
    const combined = searchBook.map(book => {
      if (mapOfIdToBooks.has(book.id)) {
        return mapOfIdToBooks.get(book.id);
      } else {
        return book;
      }
    })
    setMergeBook(combined);
  }, [searchBook])

  const createMapOfBooks = (books) => {
    const map= new Map();
    books.map(book => map.set(book.id, book));
    return map;
  }

  const updateBookShelf = (book, whereTo) => {
    const updateBooks = books.map(b => {
      if (b.id === book.id) {
        book.shelf = whereTo;
        return book;
      }
      return b;
    })
    if (!mapOfIdToBooks.has(book.id)) {
      book.shelf = whereTo;
      updateBooks.push(book)
    }
    setBooks(updateBooks);
    BookAPI.update(book, whereTo);
  };

  return (
    <div className="app">
      <Router>
        <Routes>
          {/* Search Page */}
          <Route path="/search" element={
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/">
                  <a className="close-search">Close</a>
                </Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title, author, or ISBN" value={search} onChange={handleInputChange} />
                </div>
              </div>>
              <div className="search-books-results">
                <ol className="books-grid">
                  {mergeBook.map(b => (
                    <li key={b.id}>
                        <Book book={b} updateBookShelf={updateBookShelf}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          } />

          {/* Main Page */}            
          <Route path="/" element={ // Use "element" prop for nested routes     
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <Shelves books={books} updateBookShelf={updateBookShelf} />
              </div>
              <div className="open-search">
                <Link to="/search">
                  <a>Add a book</a>
                </Link>
              </div>
            </div>
          } /> 
        </Routes>
      </Router>
    </div>
  );
};

export default App;

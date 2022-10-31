import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Menu,
  Button,
  List,
  Image
} from "semantic-ui-react";
import Book from "./Book";

function App() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});
  const [user, setUser] = useState({});

  const updateLikes =(userId, bookId) => {
    let array = book.users.find(user => user.id === userId) ? book.users.filter(user => user.id != userId) : [...book.users, user];
    let reqPackage = {
      headers: {"Content-Type":"application/json"},
      method: "PATCH",
      body: JSON.stringify({users: array})
    }
    fetch(`http://localhost:3000/books/${bookId}`, reqPackage)
    .then(res => res.json())
    .then(data => {
      setBook(data);
      let updatedBooks = books.map(book => book.id === data.id ? data : book);
      setBooks(updatedBooks);
    });
  };

  useEffect(() => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => setBooks(data))

    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
      let user = users.find(user => user.id === 1);
      setUser(user);
    })
  }, []);

  const handleClick = (id)=> {
    let book = books.find(book => book.id === id);
    setBook(book);
  };

  return (
    <div>
      <Menu inverted>
        <Menu.Item header>Bookliker</Menu.Item>
      </Menu>
      <main>
        <Menu vertical inverted>
          {books.map(book => (
              <div key={book.id}>
                <a onClick={() => handleClick(book.id)}>{book.title}</a>
              </div>
          ))}
        </Menu>
        {book.title ? <Book book={book} updateLikes={updateLikes} user={user}/> : null}
      </main>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import BooksApp from '../App';

class Book extends Component {
  // const retrievedBook;

  render() {
    return (
      <div className="book">
      {/* <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${retrievedBook.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select onChange={(event) => this.updateBook(retrievedBook, event.target.value)} value={retrievedBook.shelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{retrievedBook.title}</div>
      <div className="book-authors">
        <ul className="authors">
          {retrievedBook.authors.map((author,ind) => (
            <li key={ind}>{author}</li>
          ))}
        </ul>
      </div> */}
    </div>
    )
  }
}

export default Book;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class Shelf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booksOnShelf: []
    };
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then(response => {
        this.setState({
          booksOnShelf: response
        });
      })
      .catch(err => console.log(err));
  }

  componentWillMount() {
    this.getAllBooks();
  }

  componentDidUpdate() {
    this.getAllBooks();
  }

  updateBook = (book, event) => {
    BooksAPI.update(book, event.value)
    .then(res => {
      this.setState(state => ({
        state: state.booksOnShelf.concat([book]) 
      }));
    })
    .catch(err => console.log(err));
  }

  render() {
    const { booksOnShelf } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {booksOnShelf && booksOnShelf.length > 0  && booksOnShelf.filter(books => books.shelf === 'currentlyReading')
                  .map(book => (
                    <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(event) => this.updateBook(book, event.target)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          <ul className="authors">
                            {book.authors.map((author, ind) => (
                              <li key={ind}>{author}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksOnShelf && booksOnShelf.length > 0  && booksOnShelf.filter(books => books.shelf === 'wantToRead')
                    .map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={(event) => this.updateBook(book, event.target)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
                            <ul className="authors">
                              {book.authors.map((author, ind) => (
                                <li key={ind}>{author}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksOnShelf && booksOnShelf.length > 0  && booksOnShelf.filter(books => books.shelf === 'read')
                    .map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select defaultValue={book.shelf} onChange={(event) => this.updateBook(book, event.target)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">
                            <ul className="authors">
                              {book.authors.map((author, ind) => (
                                <li key={ind}>{author}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to={{
            pathname: '/search',
            state: {
              booksOnShelf: this.state.booksOnShelf
            }
          }}>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Shelf;
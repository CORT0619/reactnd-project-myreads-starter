import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: props.books,
      query: '',
      queryBooks: [],
      updatedBooks: []
    };
  }

  updateQuery = (event) => {
    const query = event.target.value.trim();
    this.setState({
      query
    });
  }

  setupShelf(bookResults) {
    const { books } = this.state;
    let results = bookResults.slice();

    results.forEach((result, i, array) => {
      if (books.length > 0) {
        books.forEach((book) => {
          if (result.id === book.id) {
            array[i]['shelf'] = book.shelf;
          }
        });
      }
    });
    return results;
  }

  querySearch() {
    const { query } = this.state;

    BooksAPI.search(query)
    .then(response => {
        if (response) {
          const queryBooks = this.setupShelf(response);
          this.setState({
            queryBooks: queryBooks
          });
        }
    })
    .catch(error => {
      console.log(error);
    });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('newState ', this.state.queryBooks);
    if (prevState && prevState.query !== this.state.query) {
      this.querySearch();
    }
  }
 
  updateBook = (book, event) => {
    if (this.state.updatedBooks) {
      const updatedClone = this.state.updatedBooks.slice();
      const found = updatedClone.find((element) => element === book);
    }

    const changedBook = book;
    changedBook.shelf = event.value;

    // update the queryBooks with the shelf selected  
    const queryClone = this.state.queryBooks.slice();
    const index = queryClone.indexOf(book);
    queryClone[index].shelf = event.value;
    
    this.setState(state => ({
      updatedBooks: state.updatedBooks.concat([ book]),
      queryBooks: queryClone
    }));

    BooksAPI.update(book, event.value)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  // blah = () => {
  //   this.props.newState(this.state.queryBooks)
  // }

  render() {
    const { queryBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <Link to={{
            pathname: '/',
            state: {
              queryBooks: this.state.queryBooks
            }
          }} className="close-search">Close</Link> */}
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            {/* <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/> */}
            <input type="text" value={this.state.query} onChange={this.updateQuery} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {queryBooks && queryBooks.length > 0 && (
            <ol className="books-grid">
              {queryBooks.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail: `http://via.placeholder.com/128x193?text=No%20Cover`})` }}></div>
                      <div className="book-shelf-changer">
                        {/* <select onChange={this.updateBook} value={book.shelf || 'none'}> */}
                        <select onChange={(event) => this.updateBook(book, event.target)} value={book.shelf || 'none'}>
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
                        {book.authors.map((author, indx) => (
                          <li key={indx}>{author}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default SearchPage;
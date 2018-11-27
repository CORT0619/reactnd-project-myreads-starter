import React from 'react'
import SearchPage from './components/Search';
import Shelf from './components/Shelf';
import { Route } from 'react-router-dom';
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrievedBooks: []
    };
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage />
        )}/>

        <Route exact path="/" render={() => (
          <Shelf books={this.state.retrievedBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp;

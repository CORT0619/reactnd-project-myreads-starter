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

  componentDidUpdate() {
    console.log('this.state ', this.state);
  }

  setNewState = (childState) => {
    console.log('childState ', childState);
    this.setState({
      retrievedBooks: childState
    });
  }

  render() {
    const { retrievedBooks } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchPage books={retrievedBooks} 
                      newState={this.setNewState} />
        )}/>

        <Route exact path="/" component={Shelf}/>
      </div>
    )
  }
}

export default BooksApp;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";
import * as BooksAPI from "../BooksAPI";

class Search extends Component {
  state = {
    searchResults: [],
    search: ""
  };
  onShelfMove = (book, shelf) => {
    this.props.onShelfMove(book, shelf);
    const movedBook = book.props.book.id;
    let searchResults = this.state.searchResults.filter(
      book => book.id !== movedBook
    );
    this.setState({ searchResults: searchResults });
  };
  checkIfAlreadyOnShelf(searchBooks) {
    let bookSearchId = searchBooks.map(book => book.id);
    let duplicateBooks = this.props.books.filter(book =>
      bookSearchId.includes(book.id)
    );
    searchBooks.forEach(element => {
      for (let index = 0; index < duplicateBooks.length; index++) {
        if (element.id === duplicateBooks[index].id) {
          element.shelf = duplicateBooks[index].shelf;
        }
      }
    });
  }

  handleChange = e => {
    if (e.target.value) {
      BooksAPI.search(e.target.value)
        .then(books => {
          if (Array.isArray(books)) {
            this.checkIfAlreadyOnShelf(books);
            this.setState({ searchResults: books });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      this.setState({ searchResults: [], search: "" });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {}
            <input
              type="text"
              placeholder="Search by title or author"
              search={this.state.searchResults}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf
              books={this.state.searchResults.map(book => book)}
              onShelfMove={this.onShelfMove}
            />
            <div />
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

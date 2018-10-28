import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Shelf from "./components/Shelf";
import { Link, Route } from "react-router-dom";
import Search from "./components/Search";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books: books });
    });
  }

  handleShelfMove = (book, shelf) => {
    const realBook = book.props.book;
    BooksAPI.update(realBook, shelf).then(() => {
      this.getBooks();
    });
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content" />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
              <Shelf
                title="Currently Reading"
                books={this.state.books.filter(
                  book => book.shelf === "currentlyReading"
                )}
                onShelfMove={this.handleShelfMove}
              />
              <Shelf
                title="Want To Read"
                books={this.state.books.filter(
                  book => book.shelf === "wantToRead"
                )}
                onShelfMove={this.handleShelfMove}
              />
              <Shelf
                title="Have Read"
                books={this.state.books.filter(book => book.shelf === "read")}
                onShelfMove={this.handleShelfMove}
              />
            </React.Fragment>
          )}
        />
        <Route
          path="/search"
          render={() => <Search onShelfMove={this.handleShelfMove} />}
        />
      </div>
    );
  }
}

export default BooksApp;

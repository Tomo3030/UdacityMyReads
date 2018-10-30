import React, { Component } from "react";
import Book from "./Book";

class Shelf extends Component {
  onShelfMove = (book, shelf) => {
    this.props.onShelfMove(book, shelf);
  };
  render() {
    const books = this.props.books;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {this.props.title} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {/* {books.map((book, index) => (
              <Book book={book} key={index} onShelfMove={this.onShelfMove} />
            ))} */}
            {books.length === 0 && this.props.search !== "" ? (
              <div>Can't find any Books with that search, try again</div>
            ) : (
              books.map((book, index) => (
                <Book book={book} key={index} onShelfMove={this.onShelfMove} />
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;

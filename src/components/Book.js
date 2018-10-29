import React, { Component } from "react";

class Book extends Component {
  moveBook = e => {
    this.props.onShelfMove(this, e.target.value);
  };

  render() {
    // here we make sure our books have all the correct attrinutes.
    const book = this.props.book;
    if (!book.authors) {
      book.authors = " ";
    }
    if (!book.imageLinks) {
      book.imageLinks = ["thumbnail"];
      book.imageLinks.thumbnail =
        "http://upload.wikimedia.org/wikipedia/commons/6/67/No-Book.jpg";
    }
    // note to self: join returns a string. The length of the resulted join string is > 1, so when I went back to the main page it was trying join that string. So I had to make sure it was an array and had more than length 1.
    if (book.authors.length > 1 && Array.isArray(book.authors)) {
      book.authors = book.authors.join(" and ");
    }

    if (!book.title) {
      book.title = "No Title Available";
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            />
            <div
              className={
                book.shelf
                  ? "book-shelf-changer"
                  : "book-shelf-changer not-selected"
              }
            >
              <select
                onChange={this.moveBook}
                value={book.shelf ? book.shelf : "none"}
              >
                <option disabled>Move To</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Have Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    );
  }
}

export default Book;

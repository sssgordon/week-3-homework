import React, { Component } from "react";
import Quote from "./Quote";

export class QuoteSearcher extends Component {
  state = {
    fetching: null,
    numLikes: 0,
    numDislikes: 0,
    search: ""
  };

  componentDidMount = search => {
    fetch(`https://quote-garden.herokuapp.com/quotes/search/${search}`)
      .then(response => response.json())
      .then(myJson => {
        this.setState({
          ...this.state,
          fetching: false,
          quotes: myJson,
          numLikes: 0,
          numDislikes: 0
        });
      })
      .catch(() =>
        this.setState({ ...this.state, fetching: false, error: true })
      );
  };

  setLiked = liked => {
    if (liked) {
      this.setState({ ...this.state, numLikes: this.state.numLikes + 1 });
    } else {
      this.setState({ ...this.state, numDislikes: this.state.numDislikes + 1 });
    }
  };

  handleChange = event => {
    this.setState({ ...this.state, search: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.search(this.state.search);
    // this.setState({ ...this.state, search: "" });
  };

  search = search => {
    this.componentDidMount(search);
    this.setState({ ...this.state, fetching: true });
  };

  render() {
    if (this.state.fetching === null) {
      return (
        <div>
          <h1>Quotes</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">Search!</button>
          </form>
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
        </div>
      );
    } else if (this.state.fetching) {
      return (
        <div>
          <h1>Quotes</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">Search!</button>
          </form>
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
          <p>Loading...</p>
        </div>
      );
    } else if (this.state.error) {
      return (
        <div>
          <h1>Quotes</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">Search!</button>
          </form>
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
          <h1>Error</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Quotes</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <button type="submit">Search!</button>
          </form>
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
          {this.state.quotes.results.map(quote => (
            <Quote
              id={quote._id}
              quoteText={quote.quoteText}
              quoteAuthor={quote.quoteAuthor}
              key={quote._id}
              setLiked={this.setLiked}
            />
          ))}
        </div>
      );
    }
  }
}

export default QuoteSearcher;

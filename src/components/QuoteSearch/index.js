import React, { Component } from "react";
import Quote from "../Quote";
import AddQuote from "../AddQuote";
import "./QuoteSearch.css";

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
        // console.log("fetched");
        this.setState({
          ...this.state,
          fetching: false,
          error: false,
          notFound: false,
          quotes: myJson
        });
      })
      .then(() => {
        console.log(this.state.quotes);
        if (this.state.quotes.results.length === 0 && search) {
          // console.log("not found");
          this.setState({
            ...this.state,
            notFound: true
          });
        }
      })
      .catch(() => {
        // console.log("error");
        this.setState({
          ...this.state,
          fetching: false,
          error: true,
          notFound: false
        });
      });
  };

  setLiked = liked => {
    if (liked) {
      this.setState({ ...this.state, numLikes: this.state.numLikes + 1 });
    } else {
      this.setState({ ...this.state, numDislikes: this.state.numDislikes + 1 });
    }
  };

  search = search => {
    this.componentDidMount(search);
    this.setState({
      ...this.state,
      fetching: true,
      numLikes: 0,
      numDislikes: 0
    });
  };

  addQuote = quote => {
    this.setState({
      ...this.state,
      quotes: { results: [quote, ...this.state.quotes.results] }
    });
  };

  handleChange = event => {
    // console.log(this.state.search);
    this.setState({ ...this.state, search: event.target.value });
  };

  handleSubmit = event => {
    // console.log(this.state.search);
    event.preventDefault();
    this.search(this.state.search);
    // this.setState({ ...this.state, search: "" });
  };

  refresh = () => {
    this.setState({ fetching: null, numLikes: 0, numDislikes: 0, search: "" });
    this.componentDidMount();
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
          <AddQuote addQuote={this.addQuote} />
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
          <AddQuote addQuote={this.addQuote} />
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
          <AddQuote addQuote={this.addQuote} />
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
          <h2>Error</h2>
          <p id="return" onClick={this.refresh}>
            Try again!
          </p>
        </div>
      );
    } else if (this.state.notFound) {
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
          <AddQuote addQuote={this.addQuote} />
          <h3>
            Liked: {this.state.numLikes} / Disliked: {this.state.numDislikes}
          </h3>
          <h2>No search results.</h2>
          <p id="return" onClick={this.refresh}>
            Try again!
          </p>
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
          <AddQuote addQuote={this.addQuote} />
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

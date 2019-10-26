import React, { Component } from "react";

export class AddQuote extends Component {
  state = {
    _id: `${Math.floor(Math.random() * 100 + 1)}`,
    quoteAuthor: "You",
    quoteText: ""
  };

  handleChange = event => {
    this.setState({ ...this.state, quoteText: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addQuote(this.state);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.quote}
            onChange={this.handleChange}
          />
          <button>Add wisdom!</button>
        </form>
      </div>
    );
  }
}

export default AddQuote;

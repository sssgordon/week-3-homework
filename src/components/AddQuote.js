import React, { Component } from "react";

export class AddQuote extends Component {
  state = {
    author: "You",
    quote: ""
  };

  handleChange = event => {
    this.setState({ ...this.state, quote: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addQuote(this.state.quote);
    this.setState({ ...this.state, quote: "" });
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

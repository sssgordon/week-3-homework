import React, { Component } from "react";
import PropTypes from "prop-types";

export class AddQuote extends Component {
  static propTypes = {
    addQuote: PropTypes.func.isRequired
  };

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
    this.setState({ ...this.state, quoteText: "" });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.quoteText}
            onChange={this.handleChange}
          />
          <button>Add wisdom!</button>
        </form>
      </div>
    );
  }
}

export default AddQuote;

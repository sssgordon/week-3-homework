import React, { Component } from "react";
import "./Quote.css";

export class Quote extends Component {
  state = {
    userReaction: null,
    fontSize: 16,
    color: "black"
  };

  handleClickLike = () => {
    if (!this.state.userReaction) {
      this.setState({
        userReaction: "liked",
        fontSize: this.state.fontSize + 2,
        color: "green"
      });
    } else if (this.state.userReaction === "disliked") {
      this.setState({
        userReaction: "liked",
        fontSize: this.state.fontSize + 2,
        color: "green"
      });
    } else {
      this.setState({ ...this.state, fontSize: this.state.fontSize + 2 });
    }
    this.props.setLiked(true);
  };

  handleClickDislike = () => {
    if (!this.state.userReaction) {
      this.setState({
        userReaction: "disliked",
        fontSize: this.state.fontSize - 2,
        color: "red"
      });
    } else if (this.state.userReaction === "liked") {
      this.setState({
        userReaction: "disliked",
        fontSize: this.state.fontSize - 2,
        color: "red"
      });
    } else {
      this.setState({ ...this.state, fontSize: this.state.fontSize - 2 });
    }
    this.props.setLiked(false);
  };

  render() {
    return (
      <div className="quote">
        <h3
          style={{
            color: this.state.color,
            fontSize: this.state.fontSize,
            height: "40px",
            margin: 0,
            overflow: "hidden"
          }}
        >
          {this.props.quoteText}
        </h3>
        <p>By: {this.props.quoteAuthor}</p>
        <button onClick={this.handleClickLike}>:)</button>
        <button onClick={this.handleClickDislike}>:(</button>
      </div>
    );
  }
}

export default Quote;

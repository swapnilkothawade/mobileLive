import React, { Component } from "react";
import "./App.css";
import Input from "./components/Input";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayElements: "",
      currentElement: "",
      increment: "",
      arrayItems: [],
      finalPosition: "",
      isInvalid: false
    };
  }

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  };

  cycle = (current, imove, start, end) => {
    // find the item index
    let index = this.state.arrayItems.findIndex(ele => {
      return parseInt(ele) === parseInt(current);
    });

    console.log(index);

    // error incase the current element not found
    if (index === -1) {
      this.setState({
        isInvalid: true
      });
      return;
    }

    index = index + parseInt(imove, 10);
    if (index < 0) {
      // negative circular dependency
      index =
        (index % this.state.arrayItems.length) + this.state.arrayItems.length;
    }
    // positive circular dependency
    index = index % this.state.arrayItems.length;
    console.log(index);

    this.setState({
      finalPosition: index
    });
  };

  // array duplicate validation
  isDuplicate = array => {
    return new Set(array).size !== array.length;
  };

  handleSubmit = event => {
    this.setState({
      isInvalid: false
    });

    // match the input string for validation
    const regexpr = new RegExp("[0-9]+(,[0-9]+)*");

    if (!this.state.arrayElements.match(regexpr)) {
      this.setState({
        isInvalid: true
      });
      return;
    }

    //create an array from the input string
    const arrayItems = [];
    this.state.arrayElements.split(",").map(ele => {
      return arrayItems.push(parseInt(ele, 10));
    });
    this.setState(
      {
        arrayItems
      },
      () => {
        if (this.isDuplicate(this.state.arrayItems)) {
          this.setState({
            isInvalid: true
          });
          return;
        }

        this.state.arrayItems.sort((a, b) => a - b);
        this.cycle(
          this.state.currentElement,
          this.state.increment,
          this.state.arrayItems[0],
          this.state.arrayItems[this.state.arrayItems.length - 1]
        );
      }
    );

    event.preventDefault();
  };

  render() {
    return (
      <div className="App container-fluid">
        <div className="form-group">
          <div className="row">
            <div className="col" />
            <div className="col">
              <form onSubmit={event => this.handleSubmit(event)}>
                <Input
                  type="text"
                  name="arrayElements"
                  value={this.state.arrayElements}
                  className="form-control"
                  placeholder="Enter comma seperated Array Elements"
                  onChange={event => this.handleChange(event)}
                />
                <div className="danger text-left">
                  {this.state.isInvalid ? (
                    <div>The array elements should be unique</div>
                  ) : null}
                </div>
                <Input
                  type="number"
                  name="currentElement"
                  value={this.state.currentElement}
                  className="form-control"
                  placeholder="Enter Current Element"
                  onChange={event => this.handleChange(event)}
                />
                <Input
                  type="number"
                  name="increment"
                  value={this.state.increment}
                  className="form-control"
                  placeholder="Enter Increment or Decrement"
                  onChange={event => this.handleChange(event)}
                />
                <div className="input-group mb-3">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
            <div className="col" />
          </div>
        </div>
        {!this.state.isInvalid ? (
          <div className="result-container">
            {this.state.arrayItems.map((number, i) => (
              <div
                key={i}
                id={number}
                className={
                  this.state.finalPosition === i
                    ? "final-position"
                    : parseInt(this.state.currentElement) === number
                    ? "current-position"
                    : ""
                }
              >
                {number}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

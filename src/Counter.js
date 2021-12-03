import React, { Component } from 'react';

const inc = (state, props) => {
  if (state.count >= props.max) return;
  return { count: state.count + props.step };
};

const getStateFromLocalStorage = () => {
  const storage = localStorage.getItem('counterState')
  if(storage) return JSON.parse(storage)
  return {
      count: 0,
    };
}

const storeStateInLocalStorage = state => {
  localStorage.setItem('counterState', JSON.stringify(state))
  console.log(localStorage)
}

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = getStateFromLocalStorage()
    this.decrement = this.decrement.bind(this);
    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }
  updateDocument(){
    document.title = `hey ${this.state.count}`;
  }
  increment() {
    // this.setState(inc) // This can be done if abstraction is needed
    this.setState((state, props) => {
      if (state.count >= props.max) return;
      return { count: state.count + props.step };
    },
    this.updateDocument
      // () => storeStateInLocalStorage.bind(this.state)
    );
  }
  decrement() {
    this.setState(({ count }) => {
      if (count == 0) return;
      return { count: count - 1 };
    }, this.updateDocument);
  }
  reset() {
    this.setState({ count: 0 }, this.updateDocument);
  }
  render() {
    const { count } = this.state;
    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;

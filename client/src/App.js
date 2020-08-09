import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fetched: false
    }
  }

  componentDidMount()
  {
    fetch('/data')
      .then(result => result.json())
      .then(state => this.setState({fetched: true, ...state}))
  }
  render () {
      if (!this.state.fetched)
      {
        return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Loading Bees!</p>
          </header>
        </div>
        );
      }

      return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Bees!</p>
        </header>
        <ul className="App-sidebar">
          <li>main</li>
          <li>art</li>
          <li>writings</li>
          <li>videos</li>
        </ul>
        <p className="App-body">I am the body</p>
        <footer className="App-footer">
          I am a footer
        </footer>
      </div>
    );
  }
}

export default App;

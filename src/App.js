import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Component } from 'react'


class App extends Component {
  state = { keycloak: null, authenticated: false, message: null}

  componentDidMount() {
    var xhr = new XMLHttpRequest();
    var api_endpoint = process.env.API_ENDPOINT;
    xhr.open("GET", api_endpoint, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var message = xhr.responseText;
          this.setState({ message: message });
        } else {
          console.error(xhr.statusText);
        }
      }
    }.bind(this);
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null);
  }

  render() {
    return (
    <div className="App" >
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {this.state.message ? this.state.message : "Couldn't obtain a message from backend"}
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
  )}
}

export default App;
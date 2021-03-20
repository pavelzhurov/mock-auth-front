import logo from './logo.svg';
import './App.css';
import React from 'react';
import Keycloak from 'keycloak-js'
import { Component } from 'react'


class App extends Component {
  state = { keycloak: null, authenticated: false, message: null}

  componentDidMount() {
    var keycloak = new Keycloak(
      {
        "realm": "test",
        "url": "http://keycloak:8080/auth/",
        "clientId": "frontend",
      }
    );
    keycloak.init({ flow: 'implicit', onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://127.0.0.1:8000/mock_api", true);
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + keycloak.token);
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
    })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
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
      ); 
      }
      else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}

export default App;
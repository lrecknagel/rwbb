import React, { Component } from 'react';

import './App.scss';
class App extends Component {
  render() {

    const APP_NAME = process.env.REACT_APP_NAME

    return (
      <h1 className='app'>HELLO at { APP_NAME }</h1>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import './App.scss';
@inject('store')
@observer
class App extends Component {

  async componentDidMount() {
    await this.props.store.detailStore.fetchData();
  }

  render() {

    const APP_NAME = process.env.REACT_APP_NAME

    return (
      <div>
        <h1 className='app'>HELLO at { APP_NAME }</h1>
        <p>{ JSON.stringify(this.props.store.detailStore.data) }</p>
      </div>
    );
  }
}

export default App;
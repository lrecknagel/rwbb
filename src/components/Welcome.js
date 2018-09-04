import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

// import components

// import styles
import './Welcome.scss';

@inject('store')
@observer
class Welcome extends Component {

  async componentDidMount() {
    setTimeout( async () => await this.props.store.detailStore.fetchData(), 1000);
  }

  render() {

    const APP_NAME = process.env.REACT_APP_NAME

    return (
      <div>
        <h1 className='welcome'>HELLO at { APP_NAME }</h1>
        <p>{ JSON.stringify(this.props.store.detailStore.data) }</p>
      </div>
    );
  }
}

export default Welcome;
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class PublicDetail extends Component {

  _handleGoBack = () => this.props.history.goBack();

  render() {
    return (
      <div>
        <h1>PUBLIC DETAIL</h1>
        <button onClick={this._handleGoBack}>GO BACK</button>
      </div>
    );
  }
}

export default PublicDetail;
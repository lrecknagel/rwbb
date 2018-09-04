import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class PrivateDetail extends Component {

  _handleGoBack = () => this.props.history.goBack();

  render() {
    return (
      <div>
        <h1>PRIVATE DETAIL</h1>
        <button onClick={this._handleGoBack}>GO BACK USER: { this.props.match.params.id }</button>
      </div>
    );
  }
}

export default PrivateDetail;
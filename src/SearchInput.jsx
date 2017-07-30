import React from 'react';
import { v4 } from 'uuid';

class SearchInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      lastReqId: null,
      reqSent: false,
      reqTimeout: false,
      spinnerTimer: null,
      requestTimer: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.requestServer = this.requestServer.bind(this);
  }

  requestServer(id) {
    return new Promise((res, rej) => {
      setTimeout(() => res({ id, resValue: id }), 1000);
    });
  }

  handleChange(e) {
    const currentReqId = v4();
    this.setState({
      lastReqId: currentReqId
    });
    const spinnerTimerId = setTimeout(() => {
      this.setState({
        reqSent: true
      });
    }, 500);
    const requestTimerId = setTimeout(() => {
      this.setState({
        reqSent: false,
        reqTimeout: true,
        lastReqId: null
      });
    }, 3000);
    clearTimeout(this.state.spinnerTimer);
    clearTimeout(this.state.requestTimer);
    this.setState({
      spinnerTimer: spinnerTimerId,
      requestTimer: requestTimerId
    });

    this.requestServer(currentReqId).then(data => {
      if (data.id === this.state.lastReqId) {
        clearTimeout(spinnerTimerId);
        clearTimeout(requestTimerId);
        this.setState({
          value: data.resValue,
          reqSent: false,
          reqTimeout: false
        });
      }
    });
  }

  render() {
    return (
      <div className="search-form">
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
          className="search-input"
        />
        <div>
          {this.state.reqSent && <div className="search-spinner" />}
          {this.state.reqTimeout && <span>request timeout</span>}
        </div>
      </div>
    );
  }
}

export default SearchInput;

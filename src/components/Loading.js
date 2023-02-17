import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div
        className="loading"
        data-testid="loading"
      >
        Carregando...
      </div>
    );
  }
}

export default Loading;

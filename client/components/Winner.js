import React from 'react';

export default class extends React.Component {

  static displayName = 'Winner';

  render() {

    return (
      <h1 className="winner">
        Winner is {this.props.winner}!
      </h1>
    );
  }

}

import React from 'react';

export default class extends React.Component {

  static displayName = 'Winner';

  render() {

    return (
      <div className="winner">
        Winner is {this.props.winner}!
      </div>
    );

  }

}

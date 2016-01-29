import React from 'react';

export default class extends React.Component {

  static displayName = 'Voting';

  static defaultProps = {
    pair: []
  };

  render() {

    return (
      <div className="voting">
        {
          this.props.pair.map(
            (entry, index)=>
              <button key={index}>
                <h1>{entry}</h1>
              </button>
          )
        }
      </div>
    );

  }

}

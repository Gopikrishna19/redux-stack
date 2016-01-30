import React from 'react';

export default class extends React.Component {

  static displayName = 'Board';

  static defaultProps = {
    tally: {},
    next: () => {
    }
  };

  getVotes(entry) {

    const tally = this.props.tally;

    return entry in tally ? tally[entry] : 0;

  }

  render() {

    return (
      <div>
        <div className="board">
          {
            this.props.pair.map(
              (entry, index) =>
                <div key={index} className="entry">
                  <h2>{entry}: {this.getVotes(entry)}</h2>
                </div>
            )
          }
        </div>
        <button className="next" onClick={this.props.next}>
          Next
        </button>
      </div>
    );

  }

}


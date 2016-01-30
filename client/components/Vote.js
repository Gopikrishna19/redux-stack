import React from 'react';

export default class extends React.Component {

  static displayName = 'Vote';

  static defaultProps = {
    hasVoted: false,
    pair: [],
    vote: () => {
    },
    winner: null
  };

  isDisabled() {

    return !!this.props.hasVoted;

  }

  hasVotedFor(entry) {

    return this.props.hasVoted === entry;

  }

  render() {

    return (
      <div>
        <div className="voting">
          {
            this.props.pair.map(
              (entry, index)=>
                <button
                  className="voting-button"
                  key={index}
                  disabled={this.isDisabled()}
                  onClick={() => this.props.vote(entry)}
                >
                  <h1>{entry}</h1>
                  {this.hasVotedFor(entry) ? <div>Voted</div> : null}
                </button>
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


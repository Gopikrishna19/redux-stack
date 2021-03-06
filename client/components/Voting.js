import React from 'react';
import {connect} from 'react-redux';

import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action-creators';

export class Voting extends React.Component {

  static displayName = 'Voting';

  render() {
    return (
      <div>
        {
          this.props.winner ?
          <Winner winner={this.props.winner}/> :
          <Vote {...this.props} />
        }
      </div>
    )
  }

}

export default connect(state => ({
    hasVoted: state.hasVoted,
    pair: state.vote && state.vote.pair,
    winner: state.winner
  }),
  actionCreators
)(Voting);

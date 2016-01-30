import React from 'react';
import {connect} from 'react-redux';

import Winner from './Winner';
import Board from './Board';
import * as actionCreators from '../action-creators';

export class Results extends React.Component {

  static displayName = 'Results';

  render() {

    return (
      <div className="results">
        {
          this.props.winner ?
          <Winner winner={this.props.winner}/> :
          <Board {...this.props} />
        }
      </div>
    );

  }

}

export default connect(state => ({
    pair: state.vote && state.vote.pair || [],
    tally: state.vote && state.vote.tally || {},
    winner: state.winner
  }),
  actionCreators
)(Results);

import {expect} from 'chai';

import reducer from '../../client/reducer';

describe('reducer', () => {

  it('should set the state', () => {

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 1
          }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.eql({
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      }
    });

  });

  it('should remove hasVoted when setting states if pair changes', () => {

    const initialState = {
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    };
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [
            'Sunshine',
            'Slumdog Millionaire'
          ]
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.eql({
      vote: {
        pair: [
          'Sunshine',
          'Slumdog Millionaire'
        ]
      }
    });

    expect(initialState).to.eql({
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    });

  });

  it('should set hasVoted for voting an entry', () => {

    const state = {
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      }
    };
    const action = {
      type: 'VOTE',
      entry: 'Trainspotting'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.eql({
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    });

  });

  it('should not set hasVoted for voting an invalid entry', () => {

    const state = {
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      }
    };
    const action = {
      type: 'VOTE',
      entry: 'Sunshine'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.eql({
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ],
        tally: {Trainspotting: 1}
      }
    });

  });

});
import {expect} from 'chai';

import reducer from '../../server/reducer';

describe('reducer', () => {

  it('should set entries', () => {

    const entries = [
      'Trainspotting',
      '28 Days Later'
    ];
    const action = {
      type: 'SET_ENTRIES',
      entries: entries
    };
    const nextState = reducer({}, action);

    expect(nextState).to.eql({
      entries: [
        'Trainspotting',
        '28 Days Later'
      ]
    });

  });

  it('should select entries to vote', () => {

    const state = {
      entries: [
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ]
    };
    const action = {type: 'NEXT'};
    const nextState = reducer(state, action);

    expect(nextState).to.eql({
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ]
      },
      entries: ['Sunshine']
    });

  });

  it('should tally the votes', () => {

    const state = {
      vote: {
        pair: [
          'Trainspotting',
          '28 Days Later'
        ]
      },
      entries: ['Sunshine']
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
        tally: {
          Trainspotting: 1
        }
      },
      entries: ['Sunshine']
    });

  });

  it('should reduce series of actions', () => {

    const actions = [
      {
        type: 'SET_ENTRIES',
        entries: [
          'Trainspotting',
          '28 Days Later'
        ]
      },
      {
        type: 'NEXT'
      },
      {
        type: 'VOTE',
        entry: 'Trainspotting'
      },
      {
        type: 'VOTE',
        entry: '28 Days Later'
      },
      {
        type: 'VOTE',
        entry: 'Trainspotting'
      },
      {
        type: 'NEXT'
      }
    ];
    const finalState = actions.reduce(reducer, {});

    expect(finalState).to.eql({
      winner: 'Trainspotting'
    });

  });

});

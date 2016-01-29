import {expect} from 'chai';

import {setEntries, next, vote} from '../../server/core';

describe('Application Logic', () => {

  describe('setEntries', () => {

    it('should add the entries to the state', () => {

      const entries = [
        'Trainspotting',
        '28 Days Later'
      ];
      const nextState = setEntries({}, entries);

      expect(nextState).to.eql({
        entries: [
          'Trainspotting',
          '28 Days Later'
        ]
      });

    });

  });

  describe('next', () => {

    it('should select entries to vote', () => {

      const state = {
        entries: [
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        ]
      };
      const nextState = next(state);

      expect(nextState).to.eql({
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ]
        },
        entries: ['Sunshine']
      });

      expect(state).to.eql({
        entries: [
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        ]
      });

    });

    it('should finish tallying votes and append the winner', () => {

      const state = {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 2,
            '28 Days Later': 1
          }
        },
        entries: [
          'Sunshine',
          'Millions',
          '127 Hours'
        ]
      };
      const nextState = next(state);

      expect(nextState).to.eql({
        vote: {
          pair: [
            'Sunshine',
            'Millions'
          ]
        },
        entries: [
          '127 Hours',
          'Trainspotting'
        ]
      })

    });

    it('should finish tallying votes and append the tied entries', () => {

      const state = {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 2,
            '28 Days Later': 2
          }
        },
        entries: [
          'Sunshine',
          'Millions',
          '127 Hours'
        ]
      };
      const nextState = next(state);

      expect(nextState).to.eql({
        vote: {
          pair: [
            'Sunshine',
            'Millions'
          ]
        },
        entries: [
          '127 Hours',
          'Trainspotting',
          '28 Days Later'
        ]
      })

    });

    it('should announce the winner when just one entry left', () => {

      const state = {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 2,
            '28 Days Later': 1
          }
        },
        entries: []
      };
      const nextState = next(state);

      expect(nextState).to.eql({
        winner: 'Trainspotting'
      });

    });

  });

  describe('vote', () => {

    it('should tally the votes', () => {

      const state = {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ]
        }
      };
      const nextState = vote(state, 'Trainspotting');

      expect(nextState).to.eql({
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 1
          }
        }
      });

      expect(state).to.eql({
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ]
        }
      });

    });

    it('should tally the existing votes with new', () => {

      const state = {
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 1,
            '28 Days Later': 1
          }
        }
      };
      const nextState = vote(state, '28 Days Later');

      expect(nextState).to.eql({
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 1,
            '28 Days Later': 2
          }
        }
      });

      expect(state).to.eql({
        vote: {
          pair: [
            'Trainspotting',
            '28 Days Later'
          ],
          tally: {
            Trainspotting: 1,
            '28 Days Later': 1
          }
        }
      });

    });

  });

});

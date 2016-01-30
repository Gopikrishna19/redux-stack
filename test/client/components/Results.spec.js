import React from 'react';
import ReactTestUtils  from 'react-addons-test-utils';
import {expect} from 'chai';

import {Results} from '../../../client/components/Results';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
  } = ReactTestUtils;

describe('Results', () => {

  let entryNodes;

  const entries = [
    'Trainspotting',
    '28 Days Later'
  ];

  const tally = {Trainspotting: 5};

  describe('Setup', () => {

    beforeEach(() => {

      const component = renderIntoDocument(
        <Results
          pair={entries}
          tally={tally}
        />
      );
      entryNodes = scryRenderedDOMComponentsWithClass(component, 'entry');

    });

    it('should have entries', () => {

      expect(entries.length).to.equal(2);

    });

    it('should have the entry with tally if it is given', () => {

      expect(entryNodes[0].textContent).to.contain('Trainspotting');
      expect(entryNodes[0].textContent).to.contain('5');

    });

    it('should have the entry with 0 if it is not given', () => {

      expect(entryNodes[1].textContent).to.contain('28 Days Later');
      expect(entryNodes[1].textContent).to.contain('0');

    });

  });

  describe('Actions', () => {

    it('should invoke the next callback when next button is clicked', () => {

      let nextInvoked = false;

      const next = () => nextInvoked = true;
      const component = renderIntoDocument(
        <Results
          pair={entries}
          tally={tally}
          next={next}
        />
      );
      const nextButton = scryRenderedDOMComponentsWithClass(component, 'next')[0];

      Simulate.click(nextButton);

      expect(nextInvoked).to.equal(true);

    });

    describe('When there is a winner', () => {

      let winnerNode;

      beforeEach(() => {

        const component = renderIntoDocument(
          <Results
            winner={entries[0]}
          />
        );
        entryNodes = scryRenderedDOMComponentsWithClass(component, 'entry');
        winnerNode = scryRenderedDOMComponentsWithClass(component, 'winner')[0];

      });

      it('should not have buttons', () => {

        expect(entryNodes.length).to.equal(0);

      });

      it('should just have the winner text', () => {

        expect(winnerNode.textContent).to.contain(entries[0]);

      });

    });

  });

});

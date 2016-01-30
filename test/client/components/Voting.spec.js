import React from 'react';
import ReactTestUtils  from 'react-addons-test-utils';
import {expect} from 'chai';

import {Voting} from '../../../client/components/Voting';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
  } = ReactTestUtils;

describe('Voting', () => {

  let buttons;

  const entries = [
    'Trainspotting',
    '28 Days Later'
  ];

  describe('Setup', () => {

    beforeEach(() => {

      const component = renderIntoDocument(
        <Voting pair={entries}/>
      );
      buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    });

    it('should have two buttons', () => {

      expect(buttons.length).to.equal(2);

    });

    it('should have entries as buttons text', () => {

      expect(buttons[0].textContent).to.equal(entries[0]);
      expect(buttons[1].textContent).to.equal(entries[1]);

    });

  });

  describe('Actions', () => {

    it('should invoke the callback when a button is clicked', () => {

      let votedWith = null;

      const vote = entry => votedWith = entry;
      const component = renderIntoDocument(
        <Voting
          pair={entries}
          vote={vote}
        />
      );
      buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      Simulate.click(buttons[0]);

      expect(votedWith).to.equal(entries[0]);

    });

    describe('When voted', () => {

      beforeEach(() => {

        const component = renderIntoDocument(
          <Voting
            pair={entries}
            hasVoted={entries[0]}
          />
        );
        buttons = scryRenderedDOMComponentsWithTag(component, 'button');

      });

      it('should disable the buttons', () => {

        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);

      });

      it('should have "Voted" text on voted entry', () => {

        expect(buttons[0].textContent).to.contain('Voted');

      });

    });

    describe('When there is a winner', () => {

      let winnerNode;

      beforeEach(() => {

        const component = renderIntoDocument(
          <Voting
            winner={entries[0]}
          />
        );
        buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        winnerNode = scryRenderedDOMComponentsWithClass(component, 'winner')[0];

      });

      it('should not have buttons', () => {

        expect(buttons.length).to.equal(0);

      });

      it('should just have the winner text', () => {

        expect(winnerNode.textContent).to.contain(entries[0]);

      });

    });

  });

});


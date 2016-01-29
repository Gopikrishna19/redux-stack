import React from 'react';
import ReactTestUtils  from 'react-addons-test-utils';
import {expect} from 'chai';

import Voting from '../../client/components/Voting';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag} = ReactTestUtils;

describe('Voting', () => {

  const entries = [
    'Transporting',
    '28 Days Later'
  ];

  let buttons;

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


import {expect} from 'chai';

import makeStore from '../../server/store';

describe('store', () => {

  it('should reduce action using redux store', () => {

    const store = makeStore();

    expect(store.getState()).to.eql({});

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: [
        'Trainspotting',
        '28 Days Later'
      ]
    });

    expect(store.getState()).to.eql({
      entries: [
        'Trainspotting',
        '28 Days Later'
      ]
    });

  })

});
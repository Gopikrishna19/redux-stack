import makeStore from './server/store';
import startServer from './server/server';

export const store = makeStore();

startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./server/entries.json')
});
store.dispatch({type: 'NEXT'});

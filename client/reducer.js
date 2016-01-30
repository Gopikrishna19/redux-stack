function setState(state, nextState) {

  const newState = JSON.parse(JSON.stringify(state));
  return Object.assign(newState, nextState);

}

function resetVote(state) {

  const hasVoted = state.hasVoted;
  const currentPair = state.vote && state.vote.pair || [];

  if (hasVoted && currentPair.indexOf(hasVoted) === -1) {
    const newState = JSON.parse(JSON.stringify(state));
    delete newState.hasVoted;

    return newState;
  }

  return state;

}

function vote(state, entry) {

  const currentPair = state.vote && state.vote.pair;

  if (currentPair && currentPair.indexOf(entry) > -1) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.hasVoted = entry;

    return newState;
  }

  return state;

}

export default function reducer(state = {}, action) {

  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  }

  return state;

}
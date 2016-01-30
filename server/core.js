function getVotes(votes = 0) {
  return votes;
}

function getWinners(vote) {

  if (!vote) {
    return [];
  }

  const [a, b] = vote.pair;

  const aVotes = getVotes(vote.tally[a]);
  const bVotes = getVotes(vote.tally[b]);

  if (aVotes > bVotes) {
    return a;
  } else if (bVotes > aVotes) {
    return b;
  }

  return [
    a,
    b
  ];

}

export const INITIAL_STATE = {};

export function setEntries(state, entries) {

  state.entries = state.entries || [];

  return {
    entries: state.entries.concat(entries)
  }

}

export function next(state) {

  const entries = state.entries.concat(getWinners(state.vote));

  if (entries.length === 1) {

    delete state.entries;
    delete state.vote;

    state.winner = entries[0];

    return state;
  }

  return {
    vote: {
      pair: entries.slice(0, 2)
    },
    entries: entries.slice(2)
  };

}

export function vote(state, entry) {

  const nextState = JSON.parse(JSON.stringify(state));

  nextState.vote.tally = nextState.vote.tally || {};
  nextState.vote.tally[entry] = nextState.vote.tally[entry] || 0;

  nextState.vote.tally[entry] += 1;

  return nextState;

}

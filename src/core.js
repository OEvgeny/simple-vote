
export function vote (state, vote) {
  
}

export function next (state) {
  const [p1, p2, ...entries] = state.entries
  return {
    vote: {pair: [p1, p2]},
    entries
  }
}

export function setEntries (state, entries) {
  return { entries: Array.from(entries) }
}

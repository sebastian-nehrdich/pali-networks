export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_PROBABILITY = 'UPDATE_PROBABILITY';
export const UPDATE_MAXRESULTS = 'UPDATE_MAXRESULTS';

export const updateFilter = filter => {
  return {
    type: UPDATE_FILTER,
    filter
  };
};

export const updateProbability = probability => {
  return {
    type: UPDATE_PROBABILITY,
    probability
  };
};

export const updateMaxResults = maxResults => {
  return {
    type: UPDATE_MAXRESULTS,
    maxResults
  };
};

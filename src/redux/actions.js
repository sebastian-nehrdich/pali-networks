export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_PROBABILITY = 'UPDATE_PROBABILITY';
export const UPDATE_MAXRESULTS = 'UPDATE_MAXRESULTS';
export const UPDATE_LIMITCOLLECTION = 'UPDATE_LIMITCOLLECTION';
export const UPDATE_PAGE = 'UPDATE_PAGE';

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

export const updateLimitCollection = limitCollection => {
  return {
    type: UPDATE_LIMITCOLLECTION,
    limitCollection
  };
};

export const updatePage = page => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

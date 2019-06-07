import {
  UPDATE_FILTER,
  UPDATE_PROBABILITY,
  UPDATE_MAXRESULTS,
  UPDATE_PAGE
} from './actions.js';

export const VisibilityFilters = {
  SHOW_SEGMENT: 'Segment',
  SHOW_NUMBERS: 'Numbers',
  SHOW_GRAPH: 'Graph'
};

const INITIAL_STATE = {
  filter: VisibilityFilters.SHOW_SEGMENT,
  probability: 0.065,
  maxResults: 10,
  page: 0
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        filter: action.filter
      };
    case UPDATE_PROBABILITY:
      return {
        ...state,
        probability: action.probability
      };
    case UPDATE_MAXRESULTS:
      return {
        ...state,
        maxResults: action.maxResults
      };
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};
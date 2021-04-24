import { createSelector, createStructuredSelector } from 'reselect';
import { ApplicationRootState } from '../../../rootTypes';

const selectHomeState = (state: ApplicationRootState) => {
  return state.home;
};

const homeStateSelector = createStructuredSelector({});

export { homeStateSelector };

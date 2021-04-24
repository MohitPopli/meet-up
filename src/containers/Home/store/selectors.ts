import { createSelector, createStructuredSelector } from 'reselect';
import { ApplicationRootState } from '../../../rootTypes';

const selectHomeState = (state: ApplicationRootState) => {
  return state.home;
};

const selectCurrentDate = () => createSelector(selectHomeState, (state) => state.currentSelectedDate);

const homeStateSelector = createStructuredSelector({
  selectedDate: selectCurrentDate(),
});

export { homeStateSelector };

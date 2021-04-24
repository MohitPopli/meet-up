import { ActionType } from 'typesafe-actions';
import produce, { Draft } from 'immer';
import * as homeActions from './actions';
import { HomeState } from './types';
import { HomeActionTypes } from './constants';

export type HomeActions = ActionType<typeof homeActions>;

export const initialState: HomeState = {
  currentSelectedDate: new Date(),
};

export const homeReducer = (state: HomeState = initialState, action: HomeActions): HomeState => {
  switch (action.type) {
    case HomeActionTypes.SET_CURRENT_DATE: {
      return produce(state, (draft: Draft<HomeState>) => {
        draft.currentSelectedDate = action.payload;
      });
    }
    default:
      return state;
  }
};

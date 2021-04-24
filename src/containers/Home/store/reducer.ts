import { ActionType } from 'typesafe-actions';
import produce, { Draft } from 'immer';
import * as homeActions from './actions';
import { HomeState } from './types';

export type HomeActions = ActionType<typeof homeActions>;

export const initialState: HomeState = {};

export const homeReducer = (state: HomeState = initialState, action: HomeActions): HomeState => {
  switch (action) {
    default:
      return state;
  }
};

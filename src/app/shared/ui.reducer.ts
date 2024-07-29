import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoadin } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

export const uiReducer = createReducer(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoadin, (state) => ({ ...state, isLoading: false }))
);

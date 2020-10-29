import { createReducer, createAction, ActionType } from 'typesafe-actions';
import { IVariant } from '../../types/variant';

export type VariantListState = {
  changed: IVariant[];
  heightById: { [key: string]: number };
  positionTopById: { [key: string]: number };
};

type Action = ActionType<typeof setState>;

export const setState = createAction('SET_STATE')<VariantListState>();

export const initialState = {
  changed: [],
  heightById: {},
  positionTopById: {},
};

export const reducer = createReducer<VariantListState, Action>(
  initialState
).handleAction(setState, (state, { payload }) => ({
  heightById: { ...state.heightById, ...payload.heightById },
  positionTopById: { ...state.positionTopById, ...payload.positionTopById },
  changed: payload.changed,
}));

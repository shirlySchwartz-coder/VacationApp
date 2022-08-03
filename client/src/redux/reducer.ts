import { ActionType } from './action-type';
import { Action } from './action';
import { AppState } from './app-state';

const defaultAppstate = new AppState();

export function reduce(
  oldAppState: AppState = defaultAppstate,
  action: Action
): AppState {
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.GetVacationsByPage:
      newAppState.vacations = action.payload;
      break;

    case ActionType.AddVacation:
      newAppState.vacations = [...oldAppState.vacations, action.payload];
      break;
  }

  return newAppState;
}

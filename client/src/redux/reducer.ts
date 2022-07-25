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
    case ActionType.GetAllVacations:
      newAppState.vacations = action.payload;
      break;
    // case ActionType.GetVacations:
    //   newAppState.vacations = action.payload;
    //   break;
    // case ActionType.ChangeStatus:
    // newAppState.vacations = [...oldAppState.vacations,action.payload];
    // const index = oldAppState.servers.findIndex(server => server.server_id == action.payload.server.server_id);
    // const newservers = [...oldAppState.servers];
    // newservers[index].status = action.payload.server.status;
    // newAppState.servers = [newservers];
    // newAppState.servers = oldAppState.servers.map((server) =>
    //   {
    //   if (server.server_id == action.payload.server.server_id)
    //   server.status = action.payload.server.status;
    // });
    // break;
    // case ActionType.FilterServersOn:
    //   newAppState.servers = oldAppState.servers.filter((server) => server.status == true);
    //   break;
    //   case ActionType.FilterServersByTime:
    //     newAppState.servers = oldAppState.servers.sort(
    //       (serverA, serverB) => Number(serverB.serverTime) - Number(serverA.serverTime));
    //   break;
  }

  return newAppState;
}

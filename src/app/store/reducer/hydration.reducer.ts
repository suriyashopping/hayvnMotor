// import { ActionReducer, INIT } from "@ngrx/store";
// // import { RootState } from "..";

// export const hydrationMetaReducer = (
//   reducer: ActionReducer<any>
// ): ActionReducer<any> => {
//   return (state, action) => {
//     if (action.type === INIT) {
//       const storageValue = localStorage.getItem("state");
//       if (storageValue) {
//         try {
//           return JSON.parse(storageValue);
//         } catch {
//           localStorage.removeItem("state");
//         }
//       }
//     }
//     const nextState = reducer(state, action);
//     localStorage.setItem("state", JSON.stringify(nextState));
//     return nextState;
//   };
// };
import { Action, ActionReducer } from "@ngrx/store";
import * as HydrationActions from "./../action/hydration.actions";

function isHydrateSuccess(
  action: Action
): action is ReturnType<typeof HydrationActions.hydrateSuccess> {
  return action.type === HydrationActions.hydrateSuccess.type;
}

export const hydrationMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (isHydrateSuccess(action)) {
      return action.state;
    } else {
      return reducer(state, action);
    }
  };
};
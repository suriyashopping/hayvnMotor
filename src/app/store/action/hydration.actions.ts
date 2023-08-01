import { createAction, props } from "@ngrx/store";

export const hydrate = createAction("[Hydration] Hydrate");

export const hydrateSuccess = createAction(
  "[Hydration] Hydrate Success",
  props<{ state: any }>()
);

export const hydrateFailure = createAction("[Hydration] Hydrate Failure");
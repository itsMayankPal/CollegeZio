// src/redux/Actions/resourceActions.js

export const SAVE_RESOURCE = "SAVE_RESOURCE";

export const saveResource = (resource) => {
  return {
    type: SAVE_RESOURCE,
    payload: resource,
  };
};

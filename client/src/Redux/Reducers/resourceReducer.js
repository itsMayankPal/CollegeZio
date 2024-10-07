// src/redux/Reducers/resourceReducer.js

import { SAVE_RESOURCE } from "../Actions/resourceActions";

const initialState = {
  savedResourcesList: [], // Initial state with an empty saved resources list
};

export const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_RESOURCE:
      // Check if resource already exists to prevent duplicates
      const isAlreadySaved = state.savedResourcesList.some(
        (resource) => resource.id === action.payload.id
      );
      if (isAlreadySaved) return state;

      // Add the new resource to the savedResourcesList
      return {
        ...state,
        savedResourcesList: [...state.savedResourcesList, action.payload],
      };

    default:
      return state;
  }
};

// src/Redux/Reducers/userReducer.js
const initialState = {
  id: null, // This can be set to null initially
  name: "",
  email: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

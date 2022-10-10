const initialState = {
  todos: [],
};
const home = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};
export default home;

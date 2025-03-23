const initialData = {
  data: [],
  status: "",
};
export const groupData = (state = initialData, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      state = {
        data: action.payload,
        status: "GROUP_RECEIVED_SUCCESSFULLY",
      };
      return state;
    case "SET_GROUP":
      state = {
        data: [...state.data, action.payload],

        status: "GROUP_ADDED_SUCCESSFULLY",
      };
      return state;
    case "ERROR_GROUP":
      return {
        status: "GROUP_ERROR",
      };
    default:
      return state;
  }
};

// import React,{Dispatch} from "react";
export const reducer = (state, action) => {
  const { type, value } = action;
  let temState;
  switch (type) {
    case "updatePersonalInfo":
      temState = {
        ...state,
        userInfo: value,
      };
      break;
    default:
      return state;
  }
  return temState;
};

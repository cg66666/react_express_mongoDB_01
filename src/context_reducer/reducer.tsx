// import React,{Dispatch} from "react";
export const reducer = (state, action) => {
  const { type, value } = action;
  // console.log("type", type);
  let temState;
  switch (type) {
    case "Logining":
      temState = {
        ...state,
        toLoginOrNot: true,
      };
      break;
    case "not_Login":
      temState = {
        ...state,
        toLoginOrNot: false,
      };
      break;
    default:
      return state;
  }
  return temState;
};

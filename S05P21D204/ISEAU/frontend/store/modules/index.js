import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import detailPoint from "./detailPoint";
import user from "./user";
import review from "./review";
import reviewArr from "./reviewArr";
const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({
    detailPoint,
    user,
    review,
    reviewArr,
  })(state, action);
};

export default reducer;

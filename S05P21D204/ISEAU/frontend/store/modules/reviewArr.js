import { createSlice } from "@reduxjs/toolkit";
const initialState = []; // 초기 상태 정의
const reviewArrSlice = createSlice({
  name: "reviewArr",
  initialState,
  reducers: {
    setReviewArr: (state, action) => {
      return [action.payload];
    },
  },
});
export const { setReviewArr } = reviewArrSlice.actions; // 액션 생성함수
export default reviewArrSlice.reducer; // 리듀서

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  createdAt: null,
  id: null,
  rating: null,
  reviewContent: null,
  profileimg: null,
  username: null,
  nickname: null,
}; // 초기 상태 정의
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.createdAt = action.payload.createdAt;
      state.rating = action.payload.rating;
      state.reviewContent = action.payload.reviewContent;
      state.id = action.payload.id;
      state.profileimg = action.payload.profileimg;
      state.username = action.payload.username;
      state.nickname = action.payload.nickname;
    },
  },
});
export const { setReview } = reviewSlice.actions; // 액션 생성함수
export default reviewSlice.reducer; // 리듀서

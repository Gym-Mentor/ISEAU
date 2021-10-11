import { createSlice, findNonSerializableValue } from "@reduxjs/toolkit";
const initialState = {
  id: -1,
  username: "",
  nickname: "",
  address: "",
  profileImg: "",
  phonenumber: 0,
  introduce: "",

}; // 초기 상태 정의
const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      const {
        id,
        username,
        nickname,
        address,
        profileImg,
        phonenumber,
        introduce,

      } = action.payload;
      state.id = id;
      state.username = username;
      state.nickname = nickname;
      state.address = address;
      state.profileImg = profileImg;
      state.phonenumber = phonenumber;
      state.introduce = introduce;
      

    },

  },
});
export const { setLoginState } = loginSlice.actions; // 액션 생성함수
export default loginSlice.reducer; // 리듀서

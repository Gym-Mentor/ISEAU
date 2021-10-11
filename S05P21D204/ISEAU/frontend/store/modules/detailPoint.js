import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: null,
  reviewCnt: null,
  rating: null,
  name: null,
  pointName: null,
  address: null,
  category: null,
  longitude: null,
  latitude: null,
  tide: null,
  dpwt: null,
  material: null,
  fishingImg: null,
  obsCode: null,
  obsPostId: null,
  caution: null,
  locInfo: null,
  nearPointName: null,
  fish: null,
}; // 초기 상태 정의
const detailPointSlice = createSlice({
  name: "detailPoint",
  initialState,
  reducers: {
    setDetailPoint: (state, action) => {
      const {
        id,
        reviewCnt,
        rating,
        name,
        pointName,
        address,
        category,
        longitude,
        latitude,
        tide,
        dpwt,
        material,
        fishingImg,
        obsCode,
        obsPostId,
        caution,
        locInfo,
        nearPointName,
        fish,
      } = action.payload;
      state.id = id;
      state.reviewCnt = reviewCnt;
      state.rating = rating;
      state.name = name;
      state.pointName = pointName;
      state.address = address;
      state.category = category;
      state.longitude = longitude;
      state.latitude = latitude;
      state.tide = tide;
      state.dpwt = dpwt;
      state.material = material;
      state.fishingImg = fishingImg;
      state.obsCode = obsCode;
      state.obsPostId = obsPostId;
      state.caution = caution;
      state.locInfo = locInfo;
      state.nearPointName = nearPointName;
      state.fish = fish;
    },
  },
});
export const { setDetailPoint } = detailPointSlice.actions; // 액션 생성함수
export default detailPointSlice.reducer; // 리듀서

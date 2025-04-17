import { createSlice } from "@reduxjs/toolkit";

const storeClubNama = createSlice({
  name: "string",
  initialState: {
    value: "",
  },
  reducers: {
    setClubName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setClubName } = storeClubNama.actions;
export default storeClubNama.reducer;

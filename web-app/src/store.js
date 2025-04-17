import { configureStore } from "@reduxjs/toolkit";
import storeClubName from "./redux/storeclubname";

export const store = configureStore({
  reducer: {
    clubname: storeClubName,
  },
});

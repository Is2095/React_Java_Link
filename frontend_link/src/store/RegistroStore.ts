import { configureStore } from "@reduxjs/toolkit";
import registroReducer from "./registro/slice";

export const store = configureStore({
  reducer: {
    registro: registroReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
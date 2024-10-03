import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DatosRegistro } from "../../types";

const initialState: DatosRegistro[] = [];

export const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {
    deleteRegistroById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((registro) => registro.id !== id);
    },
    guardarRegistro: (state, action: PayloadAction<DatosRegistro[]>) => {
      return action.payload;
    },
    actualizarStateRegistro: (state, action: PayloadAction<DatosRegistro>) => {
      const index = state.findIndex(registro => registro.id === action.payload.id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
      return;
    }
  }
});

export default registroSlice.reducer;

export const { deleteRegistroById, guardarRegistro, actualizarStateRegistro } = registroSlice.actions;
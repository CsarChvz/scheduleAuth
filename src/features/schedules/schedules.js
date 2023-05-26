import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newSlots: [],
  removeSlots: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addNewSlot: (state, action) => {
      // Tenemos que checar si el elemento que queremos agregar ya esta en el array de removeSlots para eliminarlo de ahi y si no se repite lo agregamos
      if (state.removeSlots.some((item) => item === action.payload)) {
        state.removeSlots = state.removeSlots.filter(
          (item) => item !== action.payload
        );
      } else {
        state.newSlots = [...state.newSlots, action.payload];
      }
    },
    removeActiveSlote: (state, action) => {
      // Tenermos que checar si el elemento que queremos eliminar esta en el array de newSlots
      if (state.newSlots.some((item) => item === action.payload)) {
        state.newSlots = state.newSlots.filter(
          (item) => item !== action.payload
        );
      } else {
        state.removeSlots = [...state.removeSlots, action.payload];
      }
    },
    setSlots: (state, action) => {
      state.newSlots = action.payload.newSlots;
      state.removeSlots = action.payload.removeSlots;
    },
  },
});

export const { addNewSlot, removeActiveSlote, setSlots } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;

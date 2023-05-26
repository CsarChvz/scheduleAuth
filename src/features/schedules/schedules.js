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
      if (state.newSlots.length > 0) {
        state.newSlots = state.newSlots.filter(
          (item) => item !== action.payload
        );
      }
      state.newSlots = [...state.newSlots, action.payload];
      console.log(state.newSlots);
    },
    removeActiveSlote: (state, action) => {
      state.removeSlots = [...state.removeSlots, action.payload];
    },
    setSlots: (state, action) => {
      state.newSlots = action.payload.newSlots;
      state.removeSlots = action.payload.removeSlots;
    },
  },
});

export const { addNewSlot, deleteSlot, setSlots } = scheduleSlice.actions;
export default scheduleSlice.reducer;

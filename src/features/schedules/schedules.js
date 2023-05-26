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
      state.removeSlots = state.removeSlots.filter(
        (slot) => Number(slot.timestamp) !== Number(action.payload.timestamp)
      );
      state.newSlots.push(action.payload);

      console.log("NEWSLOTS", state.newSlots);
      console.log("REMOVESLOTS", state.removeSlots);
    },
    removeActiveSlot: (state, action) => {
      state.newSlots = state.newSlots.filter(
        (slot) => Number(slot.timestamp) !== Number(action.payload.timestamp)
      );
      state.removeSlots.push(action.payload);

      console.log("NEWSLOTS", state.newSlots);
      console.log("REMOVESLOTS", state.removeSlots);
    },
    setSlots: (state, action) => {
      state.newSlots = action.payload.newSlots;
      state.removeSlots = action.payload.removeSlots;
    },
  },
});

export const { addNewSlot, removeActiveSlot, setSlots } = scheduleSlice.actions;
export default scheduleSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebaseConfig";
const initialState = {
  newSlots: [
    { alreadySaved: true, id: 5, label: "02:00", timestamp: 1684202400000 },
    { alreadySaved: true, id: 1, label: "00:00", timestamp: 1684195200000 },
    { alreadySaved: true, id: 1, label: "00:00", timestamp: 1685318400000 },
    { alreadySaved: true, id: 1, label: "00:00", timestamp: 1685491200000 },
    { alreadySaved: true, id: 2, label: "00:30", timestamp: 1685493000000 },
  ],
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

    uploadChanges: (state, action) => {
      // En este punto lo que se tiene que realizar es un update de los slots que se encuentran en el array de newSlots y un delete de los slots que se encuentran en el array de removeSlots
      // Para realizar el update se tiene que hacer un update de cada uno de los slots que se encuentran en el array de newSlots
    },
  },
});

export const { addNewSlot, removeActiveSlot, setSlots } = scheduleSlice.actions;
export default scheduleSlice.reducer;
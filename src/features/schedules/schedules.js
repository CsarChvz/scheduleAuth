import { createSlice } from "@reduxjs/toolkit";

import { deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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

      if (action.payload.alreadySaved) {
        state.removeSlots.push(action.payload);
      }

      console.log("NEWSLOTS", state.newSlots);
      console.log("REMOVESLOTS", state.removeSlots);
    },
    setSlots: (state, action) => {
      state.newSlots = action.payload.newSlots;
      state.removeSlots = action.payload.removeSlots;
    },

    uploadChanges: (state, action) => {
      // 1. Actualizar los slots nuevo el campo de active a true
      state.newSlots = state.newSlots.map((slot) => {
        return { ...slot, alreadySaved: true, userId: action.payload.uid };
      });

      // Con estos se tiene que checar si ya existen en la base de datos, si existen entonces se tiene que actualizar, si no existen entonces se tiene que crear
      // @TODO

      // Los anteriores se van a subir como un upsert, esto por si no existen, se van a crear, si existen entonces se van a actualizar

      // 2. Eliminar los slots que estan en removeSlots, esto se tiene que hacer con delete y buscando la referencia con el timestamp
      // Con las operaciones de firebase se tiene que eliminar los slots que estan en removeSlots

      // Se tiene que eliminar los slots, es importante que para eliminarlos se tiene que buscar la referencia con el timestamp
    },
  },
});

export const { addNewSlot, removeActiveSlot, setSlots, uploadChanges } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;

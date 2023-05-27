import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDoc,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  collection,
  where,
  query,
} from "firebase/firestore";
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
      // 1. Buscar los slots que ya están guardados en la base de datos del usuario con el UID en action.payload.uid
      console.log("action.payload.uid", action.payload.uid);

      const slotsQuery = query(
        collection(db, "slots"),
        where("userId", "==", action.payload.uid)
      );
      const getSavedSlots = getDocs(slotsQuery);

      const setSavedSlots = getSavedSlots.then((snapshot) => {
        const savedSlots = [];

        snapshot.forEach((doc) => {
          savedSlots.push(doc.data());
        });

        // Actualizar el estado con los slots encontrados
        state.newSlots = savedSlots;
        state.removeSlots = action.payload.removeSlots;
      });

      const handleErrors = (error) => {
        console.error("Error fetching saved slots:", error);
      };

      Promise.all([getSavedSlots, setSavedSlots]).catch(handleErrors);
    },
    uploadChanges: async (state, action) => {
      // 1. Actualizar los slots nuevos el campo "alreadySaved" a true
      state.newSlots = state.newSlots.map((slot) => {
        return { ...slot, alreadySaved: true, userId: action.payload.uid };
      });

      // 2. Subir o actualizar los slots nuevos en la base de datos
      await Promise.all(
        state.newSlots.forEach(async (slot) => {
          const slotRef = doc(db, "slots", slot.timestamp.toString());
          const slotDoc = await getDoc(slotRef);

          if (slotDoc.exists()) {
            await updateDoc(slotRef, slot);
          } else {
            await setDoc(slotRef, slot);
          }
        })
      );

      // 3. Eliminar los slots que están en removeSlots
      await Promise.all(
        state.removeSlots.map(async (slot) => {
          const slotRef = doc(db, "slots", slot.timestamp.toString());
          await deleteDoc(slotRef);
        })
      );
    },
  },
});

export const { addNewSlot, removeActiveSlot, setSlots, uploadChanges } =
  scheduleSlice.actions;
export default scheduleSlice.reducer;

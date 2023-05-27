import { NavigationContainer } from "@react-navigation/native";
import DrawerStack from "./Drawer";
import StackAuth from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import { restoreToken, isLoading } from "../features/auth/auth";
import { useEffect, useState } from "react";
import Splash from "../screens/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { setSlots } from "../features/schedules/schedules";

export default function RootNavigator() {
  const user = useSelector((state) => state.auth);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule); // Obtener el estado de schedule

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem("@token", user.uid);
        dispatch(restoreToken({ uid: user.uid }));
      } else {
        console.log("Si");
      }
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    getValue();
  }, []);

  // Get Value Function
  async function getValue() {
    try {
      const value = await AsyncStorage.getItem("@token");
      if (value !== null) {
        console.log("Data stored", value);
        dispatch(restoreToken(value));
      } else {
        dispatch(restoreToken(null));
      }
      dispatch(restoreToken(value));
    } catch (error) {
      console.log(error);
    }
  }

  // Función para cargar los slots
  function loadSlots() {
    const { uid } = user; // Obtener el UID del usuario actual desde el estado de autenticación
    dispatch(setSlots({ uid: uid, newSlots: [], removeSlots: [] })); // Llamar a la acción setSlots con los parámetros necesarios
  }

  if (user.isLoading || schedule.isLoading) {
    console.log("Loading");
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user.userToken ? <DrawerStack /> : <StackAuth />}
    </NavigationContainer>
  );
}

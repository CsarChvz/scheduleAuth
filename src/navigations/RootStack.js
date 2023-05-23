import { NavigationContainer } from "@react-navigation/native";
import DrawerStack from "./Drawer";
import StackAuth from "./AuthStack";
import { useDispatch, useSelector } from "react-redux";
import { restoreToken, isLoading } from "../features/auth/auth";
import { useEffect, useState } from "react";
import Splash from "../screens/Splash";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootNavigator() {
  const user = useSelector((state) => state.auth);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
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

  if (user.isLoading) {
    console.log("Loading");
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {user.userToken ? <DrawerStack /> : <StackAuth />}
    </NavigationContainer>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/authScreens/Login";
import SignUp from "../screens/authScreens/SignUp";

const Auth = createNativeStackNavigator();

export default function StackAuth() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
}

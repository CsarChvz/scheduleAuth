import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Scheduled from "../screens/Scheduled";
import Profile from "../screens/Profile";

const HomeStack = createNativeStackNavigator();

export default function StackHome() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Scheduled" component={Scheduled} />
    </HomeStack.Navigator>
  );
}

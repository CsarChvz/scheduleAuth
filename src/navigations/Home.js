import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Scheduled from "../screens/Scheduled";

const HomeStack = createNativeStackNavigator();

export default function StackHome() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Scheduled" component={Scheduled} />
    </HomeStack.Navigator>
  );
}

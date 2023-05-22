import { NavigationContainer } from "@react-navigation/native";
import StackHome from "./Home";
import DrawerStack from "./Drawer";

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

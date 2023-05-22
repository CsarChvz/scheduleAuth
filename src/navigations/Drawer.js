import { createDrawerNavigator } from "@react-navigation/drawer";
import Scheduled from "../screens/Scheduled";
import StackHome from "./Home";

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Scheduled} />
    </Drawer.Navigator>
  );
}

export default DrawerStack;

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackHome from "./Home";
import { View } from "react-native";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const Logout = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Logout</Text>
    </View>
  );
};

function DrawerStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={StackHome} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default DrawerStack;

import { createDrawerNavigator } from "@react-navigation/drawer";
import StackHome from "./Home";
import { View } from "react-native";

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
    </Drawer.Navigator>
  );
}

export default DrawerStack;

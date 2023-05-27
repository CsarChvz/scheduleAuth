import { createDrawerNavigator } from "@react-navigation/drawer";
import StackHome from "./Home";
import { View, Text, TouchableOpacity } from "react-native";
import Profile from "../screens/Profile";
import { useSelector } from "react-redux";

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
  const { newSlots, removeSlots } = useSelector((state) => state.schedule);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },

        headerRightContainerStyle: {
          paddingRight: 20,
        },

        headerRight: () => {
          if (
            (newSlots.length > 0 ) &&
            newSlots.some((slot) => slot.alreadySaved === false) || removeSlots.length > 0
          ) {
            return (
              <TouchableOpacity onPress={() => console.log("Guaradr")}>
                <Text>Guardar</Text>
              </TouchableOpacity>
            );
          } else {
            return null;
          }
        },
      }}
    >
      <Drawer.Screen name="Home" component={StackHome} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

export default DrawerStack;

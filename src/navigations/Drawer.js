import { createDrawerNavigator } from "@react-navigation/drawer";
import StackHome from "./Home";
import { View, Text, TouchableOpacity } from "react-native";
import Profile from "../screens/Profile";
import { useDispatch, useSelector } from "react-redux";
import { uploadChanges } from "../features/schedules/schedules";
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
  const { userToken } = useSelector((state) => state.auth);

  const { newSlots, removeSlots } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

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
            (newSlots?.length > 0 &&
              newSlots?.some((slot) => slot.alreadySaved === false)) ||
            removeSlots?.length > 0
          ) {
            return (
              <TouchableOpacity
                onPress={() =>
                  dispatch(
                    uploadChanges({
                      uid: userToken,
                    })
                  )
                }
              >
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

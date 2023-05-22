import { NavigationContainer } from "@react-navigation/native";
import DrawerStack from "./Drawer";
import StackAuth from "./AuthStack";
import { useSelector } from "react-redux";

export default function RootNavigator() {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return (
    <NavigationContainer>
      {user.userToken ? <DrawerStack /> : <StackAuth />}
    </NavigationContainer>
  );
}

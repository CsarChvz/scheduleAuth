import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/Auth";

const Auth = createNativeStackNavigator();

export default function StackAuth() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: "pop",
      }}
    >
      <Auth.Screen name="Auth" component={AuthScreen} />
    </Auth.Navigator>
  );
}

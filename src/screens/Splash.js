import { ActivityIndicator, Text, View } from "react-native";
import { globalStyles } from "../styles/globalStyles";
export default function Splash() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Welcome</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

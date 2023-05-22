import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";

function Scheduled() {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <Text>Scheduled</Text>
    </View>
  );
}

export default Scheduled;

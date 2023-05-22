import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
function SignUp() {
  const navigation = useNavigation();
  return (
    <View style={globalStyles.container}>
      <Text>SignUp</Text>
      <MyInput label="Email" />
      <MyInput label="Password" secureTextEntry={true} />
      <MyButton label="Sign Up" />
      <MyButton
        label="Login"
        onPress={() => {
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}

export default SignUp;

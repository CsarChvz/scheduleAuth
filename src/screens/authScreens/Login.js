import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { signIn } from "../../features/auth/auth";

function Login() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  async function save(value) {
    try {
      await AsyncStorage.setItem("@token", value);
      dispatch(signIn(value));
      console.log("token saved");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Login</Text>
      <MyInput label="Email" />
      <MyInput
        label="Password"
        secureTextEntry={true}
        value={token}
        onChangeText={setToken}
      />
      <MyButton
        label="Login"
        onPress={() => {
          save(token);
        }}
      />
      <MyButton
        label="SignUp"
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      />
    </View>
  );
}

export default Login;

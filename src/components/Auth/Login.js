import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import MyInput from "../MyInput";
import MyButton from "../MyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setAuthState, signIn } from "../../features/auth/auth";
import { TextInput } from "react-native";

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
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={token}
          onChangeText={(text) => setToken(text)}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
      <MyButton
        label="Login"
        onPress={() => {
          save(token);
        }}
      />
      <MyButton
        label="SignUp"
        onPress={() => {
          dispatch(setAuthState("signUp"));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});

export default Login;

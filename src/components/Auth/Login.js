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

function Login({ onLogin, setEmail, setPassword }) {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  async function save(value) {
    try {
      dispatch(signIn(value));
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
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry={true}
        />
      </View>
      <MyButton
        label="Login"
        onPress={() => {
          // onLogin();
          save("sdasdasd");
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

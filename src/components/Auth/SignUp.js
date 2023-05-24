import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { useNavigation } from "@react-navigation/native";
import MyInput from "../../components/MyInput";
import MyButton from "../../components/MyButton";
import { useDispatch } from "react-redux";
import { setAuthState } from "../../features/auth/auth";
function SignUp({ onSignUp, setEmail, setPassword }) {
  const dispatch = useDispatch();
  return (
    <View style={globalStyles.container}>
      <Text>SignUp</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
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
      <MyButton label="Sign Up" onPress={onSignUp} />
      <MyButton
        label="Login"
        onPress={() => {
          dispatch(setAuthState("signIn"));
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
export default SignUp;

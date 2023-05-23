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

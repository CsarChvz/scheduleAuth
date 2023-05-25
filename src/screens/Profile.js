import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { signOut } from "../features/auth/auth";

import { signOut as SignOutFirebase } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Profile() {
  const dispatch = useDispatch();
  return (
    <View style={globalStyles.container}>
      <Button
        title="Sign out"
        onPress={async () => {
          await SignOutFirebase(auth);
          await AsyncStorage.removeItem("@token");
          dispatch(signOut());
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default Profile;

import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";

export default function MyInput({ label, value, setValue, secureTextEntry }) {
  return (
    <View style={styles.container}>
      <TextInput onChangeText={(text) => setValue(text)} />
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

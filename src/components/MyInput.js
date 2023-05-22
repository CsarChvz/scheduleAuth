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
      <TextInput
        placeholder={label}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(e) => {
          let valor = e;
          console.log(valor);
          setValue(valor);
        }}
        style={styles.input}
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

import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import NIMInput from "./NimInput";
import NameInput from "./Input";

export default function App() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");

  const handleChangeMyName = (value) => {
    setName(value);
  };

  const handleChangeMyNIM = (value) => {
    setNim(value);
  };

  return (
    <View style={styles.container}>
      <Text>
        {name} - {nim}
      </Text>
      <NameInput name={name} onChangeText={handleChangeMyName} />
      <NIMInput nim={nim} onChangeText={handleChangeMyNIM} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
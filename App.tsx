import { useState } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import Counter from "./Counter";
import UserInfo from "./Profile";

export default function App() {
  const [count, setAgeInput] = useState(0);
  const [nameInput, setNameInput] = useState("");
  const [age, setAge] = useState(0);
  const [name, setName] = useState("");

  const handleIncrement = () => {
    setAgeInput(prevState => prevState + 1)
  };

  const handleDecrement = () => {
    setAgeInput(prevState => {
      if (prevState == 0) {
        return prevState
      }

      return prevState - 1
    })
  };

  const submitData = () => {
    setAge(count);
    setName(nameInput);

    setNameInput("")
    setAgeInput(0)
  };

  return (
    <View style={styles.container}>
      <View>
        <UserInfo age={age} name={name} />
        <View style={styles.counter}>
          <Counter
            value={count}
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
          <Button title="Pass Value" onPress={submitData} />
        </View>
        <TextInput
          onChangeText={setNameInput}
          value={nameInput}
          style={styles.input}
          placeholder="Input your name here"
        />
      </View>
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
  input: {
    height: 40,
    marginTop: 12,
    borderWidth: 1,
    padding: 10,
  },
  counter: {
    paddingLeft: 30,
    paddingRight: 30
  }
});
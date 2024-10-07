import { Text, View, TextInput } from "react-native";

const NameInput = ({ name, onChangeText }) => {
    console.log(name);
    return (
      <View>
        <Text>Name</Text>
        <TextInput
          placeholder="Input your name"
          style={{
            borderColor: "black",
            borderWidth: 1,
            padding: 10,
            borderRadius: 8,
          }}
          onChangeText={onChangeText}
        />
      </View>
    );
  };

export default NameInput;
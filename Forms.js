import { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { updatePost } from "./services/axios";

const Forms = ({ navigation, route }) => {
  const { post } = route.params;

  const [titleInput, setTitleInput] = useState(post.title)
  const [bodyInput, setBodyInput] = useState(post.body)

  const submitForm = (data) => {
    updatePost(data).then(res => {
      if (res.status === 200) {
        navigation.goBack()
      }
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center" }}>
        <TextInput
          label="Title"
          value={titleInput}
          style={{ marginBottom: 20 , width: 250}}
          onChangeText={text => setTitleInput(text)}
        />
        <TextInput
          label="Body"
          value={bodyInput}
          style={{ marginBottom: 20, width: 250, height: 300 }}
          onChangeText={text => setBodyInput(text)}
          multiline
        />
        <Button style={{ marginBottom: 20 }} mode="contained" onPress={() => submitForm({ ...post, title: titleInput, body: bodyInput })}>
          Update Post
        </Button>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    </View>
  );
};

export default Forms;
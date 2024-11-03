import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Card,
  IconButton,
  Divider,
  Appbar,
  Text
} from 'react-native-paper';
import Animated, { Easing, FadeInLeft } from "react-native-reanimated";
import { getPosts } from './services/axios';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([])

  const getAllPosts = () => {
    getPosts().then(res => {
      if (res.status === 200) {
        setPosts(res.data)
      }
    })
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Posts List" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.cardScrollview} >
        {posts.length > 0 && posts.map((post, index) => (
          <View key={post.id}>
            <Animated.View entering={FadeInLeft.delay(index * 200).easing(Easing.ease)}>
              <Card style={styles.card} onPress={() => navigation.navigate("Forms", { post })}>
                <Card.Title
                  title={post.title}
                />
                <Card.Content>
                  <Text variant="bodyMedium">{post.body}</Text>
                </Card.Content>
              </Card>
            </Animated.View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardScrollview: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  }
});

import { StyleSheet, View, ScrollView } from 'react-native';
import {
  Avatar,
  Card,
  Button,
  IconButton,
  Divider,
  Appbar,
  PaperProvider
} from 'react-native-paper';

const testData = [
  {
    name: 'John Smith',
    email: 'johnsmith@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/75.jpg',
  },
  {
    name: 'Michael Johnson',
    email: 'michaeljohnson@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Emily Williams',
    email: 'emilywilliams@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/76.jpg',
  },
  {
    name: 'William Brown',
    email: 'williambrown@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/77.jpg',
  },
  {
    name: 'Olivia Jones',
    email: 'oliviajones@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/77.jpg',
  },
  {
    name: 'James Miller',
    email: 'jamesmiller@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/78.jpg',
  },
  {
    name: 'Sophia Davis',
    email: 'sophiadavis@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/78.jpg',
  },
  {
    name: 'Ethan Garcia',
    email: 'ethangarcia@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/79.jpg',
  },
  {
    name: 'Ava Rodriguez',
    email: 'avarodriguez@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/79.jpg',
  },
  {
    name: 'David Wilson',
    email: 'davidwilson@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/80.jpg',
  },
  {
    name: 'Sophia Taylor',
    email: 'sophiataylor@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/80.jpg',
  },
  {
    name: 'Daniel Anderson',
    email: 'danielanderson@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/81.jpg',
  },
  {
    name: 'Madison Lopez',
    email: 'madisonlopez@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/81.jpg',
  },
  {
    name: 'Matthew Martinez',
    email: 'matthewmartinez@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/82.jpg',
  },
  {
    name: 'Ava Hernandez',
    email: 'avahernandez@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    name: 'Joseph Brooks',
    email: 'josephbrooks@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/83.jpg',
  },
  {
    name: 'Evelyn Perez',
    email: 'evelynperez@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/83.jpg',
  },
  {
    name: 'Christopher Harris',
    email: 'christopherharris@example.com',
    photo_url: 'https://randomuser.me/api/portraits/men/84.jpg',
  },
  {
    name: 'Abigail King',
    email: 'abigailking@example.com',
    photo_url: 'https://randomuser.me/api/portraits/women/84.jpg',
  },
];

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Friends List" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.cardScrollview} >
          {testData.map((user) => (
            <Card style={styles.card} >
              <Card.Title
                title={user.name}
                subtitle={user.email}
                left={(props) => (
                  <Avatar.Image size={50} source={{ uri: user.photo_url }} />
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="dots-vertical"
                    onPress={() => {}}
                  />
                )}
              />
              <Card.Actions>
                <Button>Send Message</Button>
              </Card.Actions>
              <Divider />
            </Card>
          ))}
        </ScrollView>
      </View>
    </PaperProvider>
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

import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);

    setError('');
  };

  const saveLocationToFile = async () => {

    if (!latitude || !longitude) {
      setError("Location data required");
      return
    }
    
    const fileUri = FileSystem.documentDirectory + 'location_data.txt';
    const locationData = `Latitude: ${latitude}, Longitude: ${longitude}\n`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, locationData, { encoding: FileSystem.EncodingType.UTF8 });

      setError('');
    } catch (error) {

      console.log("Error saving location data to file:", error);
      setError("Error saving location data to file");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Andi Usman Balo - 00000037809</Text>
      <Button style={styles.getGeoLocationBtn} title="GET GEO LOCATION" onPress={getLocation} />
      <Button title="Save Location to File" onPress={saveLocationToFile} />
      {latitude && longitude && (
        <View style={styles.coordinates}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </View>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 20,
  },
  coordinates: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  getGeoLocationBtn :{
    marginBottom: 10
  }
});
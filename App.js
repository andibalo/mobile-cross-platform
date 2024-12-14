import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import { firestoreDB, storage } from './firebaseCfg';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addListenerOnNotification, registerForPushNotificationsAsync, sendPushNotification } from './notificationCfg';

export default function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [notificationToken, setNotificationToken] = useState(null);

  useEffect(() => {
    async function notify(){
      const token = await registerForPushNotificationsAsync();

      if(token)
        console.log("Notification token: " + token);
      else
        console.log("No notification token found");

      setNotificationToken(token ?? null);
    }

    notify();
  })


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const addData = async () => {
    if (!image ) {
      setError("Image is required");
      return
    }


    if (!latitude || !longitude) {
      setError("Location data required");
      return
    }

    addListenerOnNotification((unsubscribe) => {
      console.log("Unsubscribing...");
      unsubscribe();
    });

    try {
      const data = {
        first: "Andi",
        last: "Balo",
        born: 2000,
      };

      if (image.uri) {
        console.log("Uploading image to storage...");

        console.log(`reading file: ${image.uri}`);
        const ext = image.uri?.split(".").pop();
        const file = await fetch(image.uri);
        const fileBlob = await file.blob();

        const imgRef = ref(storage, `test-app/newImage.${ext}`);

        console.log("uploading file...");
        const imgUrl = await uploadBytes(imgRef, fileBlob, { contentType: `image/${ext}` });
        console.log("File uploaded to storage: " + imgUrl.ref.fullPath);

        data.imageUrl = await getDownloadURL(imgUrl.ref);

        console.log("Image uploaded to storage: " + data.imageUrl);
      }


      data.lat = latitude;
      data.long = longitude;

      const docRef = await addDoc(collection(firestoreDB, "photos"), data);
      const insertedData = await getDoc(doc(firestoreDB, "users", docRef.id));


      if(notificationToken && insertedData.exists()){
        console.log(`data: ${JSON.stringify(insertedData.data())}`);
        sendPushNotification(notificationToken, insertedData.data());
      }
      else
        console.log("No notification token found, unable to send notification");

      console.log("Document written with ID: ", docRef.id);

      setError('');
    } catch (err) {
      console.error("Error adding document: ", err);
      setError(err);
    }
  }

  const getLocation = async () => {

    try {
      console.log("d")
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
  
      setError('');
    } catch (error) {
      console.log(error)
      
      setError(error);
    }

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

  const handleCameraLaunch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const openImagePicker = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0]);

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Andi Usman Balo - 00000037809</Text>
      <Button style={styles.getGeoLocationBtn} title="GET GEO LOCATION" onPress={getLocation} />
      <Button title="Save Location to File" onPress={saveLocationToFile} />
      <Button title="Open Camera" onPress={handleCameraLaunch} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Save to firebase" onPress={addData} />
      {latitude && longitude && (
        <View style={styles.coordinates}>
          <Text>Latitude: {latitude}</Text>
          <Text>Longitude: {longitude}</Text>
        </View>
      )}
      {image && image.uri && <Image source={{ uri: image.uri }} width={200} height={200} />}
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
  getGeoLocationBtn: {
    marginBottom: 10
  },
  camera: {
    flex: 1,
  },
});
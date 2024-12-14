import { isDevice } from "expo-device";
import {
    AndroidImportance,
    getExpoPushTokenAsync,
    getPermissionsAsync,
    requestPermissionsAsync,
    setNotificationChannelAsync,
    setNotificationHandler,
} from "expo-notifications";
import { Alert, Platform } from "react-native";
import messages from "@react-native-firebase/messaging";

setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        };
    }
});

function handleRegistrationError(errorMessage) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

export function addListenerOnNotification(onMessage) {
    const unsubscribe = messages()
        .onMessage(async remoteMessage => {
            const data = remoteMessage.data?.body;
            const jsonData = typeof data === "string" ? JSON.parse(data) : data;
            Alert.alert("A new FCM message arrived!", JSON.stringify(jsonData, null, 2));

            onMessage(unsubscribe);
        });
}

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
        setNotificationChannelAsync('default', {
            name: 'default',
            importance: AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (isDevice) {
        const { status: existingStatus } = await getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('Permission not granted to get push token for push notification!');
            return;
        }
        const projectId = "9ab4946c-85bc-4747-977c-48300c0d0d3f";
        try {
            const pushTokenString = (
                await getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            console.log(pushTokenString);
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('Must use physical device for push notifications');
    }
}

export async function sendPushNotification(expoPushToken, data) {
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: expoPushToken,
            data: data
        }),
    });

    console.log(`response success`);
}
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native'; // Import the Platform module
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NEXT_PUBLIC_SERVER_NAME } from "@env";


let expoPushToken = ""; 
async function getExpoPushTokenFromLocalStorage() {
  try {
    const pushToken = await AsyncStorage.getItem('pushToken');
    if (pushToken !== null) {
      expoPushToken = pushToken; // Update the global variable
      console.log("Retrieved expoPushToken from local storage:", expoPushToken);
    } else {
      console.log("expoPushToken not found in local storage.");
    }
  } catch (error) {
    console.error("Error retrieving expoPushToken from local storage:", error);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token !== null) {
      // Token retrieved
      return token;
    }
  } catch (e) {
    // error reading value
    console.log("Error retrieving token", e);
  }
  return null;
};
const savePushToken = async (pushtoken) => {
  try {
    const response = await fetch(
      `${NEXT_PUBLIC_SERVER_NAME}/notifications/setExpoPushToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
          
        },
        body: JSON.stringify({
          token: pushtoken 
        }),
      }
    );
    if (!response.ok) {
      await AsyncStorage.removeItem("pushtoken");
      throw new Error("Couldn't save pushtoken in database");
    }
  } finally {
    console.log("saved")
  }
};



  async function registerForPushNotificationsAsync() {
    let pushtoken;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const projectId =Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      pushtoken = (
        await Notifications.getExpoPushTokenAsync({
          projectId:projectId,
        })
      ).data;
      await AsyncStorage.setItem('pushToken', pushtoken);
      await savePushToken(pushtoken);
      console.log(pushtoken);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return pushtoken;
  }

  
  const sendNotification = async () => {
    await getExpoPushTokenFromLocalStorage(); 
    console.log("Sending push notification...");
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "My first push notification!",
      body: "This is my first push notification made with expo rn app",
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        host: "exp.host",
        accept: "application/json",
        "accept-encoding": "gzip, deflate",
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
  };
// }


export { registerForPushNotificationsAsync, sendNotification }; 

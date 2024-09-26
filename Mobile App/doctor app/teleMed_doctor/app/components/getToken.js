import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        // Token retrieved
        return token;
      }
    } catch (e) {
      // error reading value
      console.log('Error retrieving token', e);
    }
    return null;
};
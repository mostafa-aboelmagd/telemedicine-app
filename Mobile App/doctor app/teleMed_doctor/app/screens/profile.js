import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NEXT_PUBLIC_SERVER_NAME } from '@env';
import { NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY } from '@env';

// Main AuthContainer component
const AuthContainer = ({ navigation }) => {
  const [token, setToken] = useState(null); // Holds the authentication token
  const [loading, setLoading] = useState(true); // Manages loading state

  useEffect(() => {
    // Check for stored token when the component mounts
    const checkAuthToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        setLoading(false); // Stop loading once the token is checked
      } catch (error) {
        console.error('Error retrieving token:', error);
        setLoading(false);
      }
    };

    checkAuthToken();
  }, []);

  const login = async () => {
    try {
      // Example API call to log in (replace with your real API)
      const response = await axios.post(`${NEXT_PUBLIC_SERVER_NAME}/login`, {
        username: 'yahya@test1.com',
        password: 'test@123!'
        }, {
        headers: {
            Authorization: `Bearer ${NEXT_PUBLIC_ACCESS_TOKEN_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

      const userToken = response.data.token;
      await AsyncStorage.setItem('token', userToken); // Store the token in AsyncStorage
      setToken(userToken); // Update token state
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token'); // Remove token from storage
    setToken(null); // Reset token state
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Display loading spinner while checking token
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button title="Login" onPress={login} />
      {token ? (
        // If token exists, show HomeScreen (authenticated)
        <View>
          <Text>Welcome to the Home Screen!</Text>
          <Text>kjlk</Text>
        </View>
      ) : (
        // If no token, show MainScreen (login or unauthenticated)
        <View>
          <Text>Please log in to continue</Text>
        </View>
      )}
    </View>
  );
};

export default AuthContainer;

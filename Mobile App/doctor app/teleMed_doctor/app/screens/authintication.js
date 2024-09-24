import React, { useState, useEffect } from 'react';
import { NEXT_PUBLIC_SERVER_NAME } from '@env';

export default function Authorization ({ navigation, route }) {

    const { data } = route.params

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
        const response = await fetch(`${NEXT_PUBLIC_SERVER_NAME}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                username: data.email,
                password: data.password,
            }),
        });

        const userToken = response.data.token;
        await AsyncStorage.setItem('token', userToken); // Store the token in AsyncStorage
        navigation.navigate('home page', {token: userToken})

        } catch (error) {
        console.error('Login failed:', error);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />; // Display loading spinner while checking token
    }
}
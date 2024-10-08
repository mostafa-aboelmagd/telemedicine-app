import React from 'react';
import {Text, StyleSheet} from 'react-native';


export default function CustomTitle ({ children, titleStyle, ...props }) {
return (
    <Text style={[styles.text, titleStyle]} {...props}>
        {children}
    </Text>
  );
};

const styles = StyleSheet.create({
    text: {
        color: '#1565c0',
        fontSize: 24, // Added font size for better visibility
        marginBottom: 10, // Space between image and text
        fontWeight: 'bold'
    },
})

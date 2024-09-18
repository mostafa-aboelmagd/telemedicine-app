import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function Custombutton ({ children, buttonStyle, textStyle, ...props }) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      {...props}
    >
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1565c0',
    margin: 10,
    borderRadius: 15,
    padding: 10,
    width: 150,
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  }
});

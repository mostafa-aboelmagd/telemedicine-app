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
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    width: '90%'
  },
  text: {
    color: 'white',
    fontSize: 22,
  }
});

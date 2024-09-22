import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Pending ({ navigation }) {
return (
      <View style={styles.container}>
        <Image
            source={require('../../assets/images/logo.png')} // Path to your image in the project folder
            style={styles.image}
        />
        <Text style={styles.text}>We still confirming your registration,  youl will get an email once it is done.</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', 
  },
  image: {
    width: 350,
    height: 350
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24
  }
})

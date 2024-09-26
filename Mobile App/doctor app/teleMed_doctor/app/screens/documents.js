import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import CustomTitle from '../components/title';

export default function Documents ({ navigation }) {
return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle>Documents</CustomTitle>
        <View style={{alignItems: 'center', marginTop: '15%'}}>
            <Image source={require('../../assets/images/radiology.jpeg')}
            style={styles.image}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: '20%'}}>
            <TouchableOpacity>
                <Text style={styles.button}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.button}>Print</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    padding: '10%',
    paddingTop: '5%'
  },
  image: {
    width: 250,
    height: 380,
  },
  button: {
    padding: 5,
    borderRadius: 15,
    fontSize: 18,
    width: 120,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#1565c0'
  }
})

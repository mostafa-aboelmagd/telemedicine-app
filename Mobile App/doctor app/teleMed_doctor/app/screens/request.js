import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import CustomScroll from '../components/scroll';

export default function Request ({ navigation }) {

  // for testing
  const names = ['username1', 'username2', 'username3'];

return (
    <SafeArea>
      <CustomScroll>
      <View style={{alignItems: 'center'}}>      
        <CustomTitle titleStyle={{marginTop: '10%'}}>Requests</CustomTitle>
        {names.map((item) => 
        <View>
          <View style={[styles.card]}>
            <Text style={styles.state}>online / follow up</Text>
            <Text style={styles.name}>{item}</Text>
            <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <Custombutton buttonStyle={{backgroundColor: 'green', width: '25%'}} textStyle={{fontSize: 15}}>
            Accept
          </Custombutton>
          <Custombutton buttonStyle={{backgroundColor: 'red', width: '25%'}} textStyle={{fontSize: 15}}>
            Decline
          </Custombutton>
          <Custombutton buttonStyle={{width: '25%'}} textStyle={{fontSize: 15}}>
            Details
          </Custombutton>
          </View>
          </View>
        )}
      
      </View>
      </CustomScroll>
      <Footer navigation={navigation}/>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    margin: '3%',
    width: '80%',
    height: 120,
    padding: 5
  },
  state: {
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 10,
    color: 'white',
    width: 125,
    textAlign: 'center',
    marginBottom: '3%'
  },
  name:{
    marginBottom: '3%'
  }
  
})

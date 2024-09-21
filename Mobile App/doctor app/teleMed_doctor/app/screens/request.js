import React from 'react';
import { View, Text, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import Footer from '../components/footer';
import CustomTitle from '../components/title';
import Custombutton from '../components/button';
import CustomScroll from '../components/scroll';

export default function Request ({ navigation }) {

  // for testing
  const names = ['username1', 'username2', 'username3', 'username4'];

  const details = () => {
    navigation.navigate('details')
  }

return (
    <SafeArea>
      <CustomScroll>
      <View style={{alignItems: 'center'}}>      
        <CustomTitle titleStyle={{marginTop: '10%'}}>Requests</CustomTitle>
        {names.map((item) => 
        <View>
          <View style={[styles.card]}>
            {/* add history button (...) in a row with the state */}
            {/* add the date and time */ }
            <Text style={styles.state}>online / follow up</Text>
            <Text style={styles.name}>{item}</Text>
            <Text>Stating complaints: I've been experiencing severe chest pain for the past two days.</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
          <Custombutton 
          buttonStyle={[styles.button, {backgroundColor: 'green'}]}
          textStyle={{fontSize: 15}}>
            Accept
          </Custombutton>
          <Custombutton buttonStyle={[styles.button, {backgroundColor: 'red'}]} textStyle={{fontSize: 15}}>
            Decline
          </Custombutton>
          <Custombutton
          buttonStyle={[styles.button, {width: '35%'}]}
          textStyle={{fontSize: 15}}
          onPress={details}>
            Ask for details
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
    borderColor: 'lightgray',
    borderRadius: 10,
    marginTop: '3%',
    width: '100%',
    height: 120,
    padding: 5,
    backgroundColor: 'white'
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
  },
  button: {
    width: '25%',
    marginRight: '0%'
  },
  
})

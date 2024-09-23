import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import SafeArea from '../components/safeArea';
import { detials } from '../test/data';
import CustomTitle from '../components/title';

export default function App_Detials ({ navigation }) {

    const documents = () => {
        navigation.navigate('documents')
    }

return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle>Appointment details</CustomTitle>
        <ScrollView>
            <CustomTitle titleStyle={{color: 'black', fontSize:24}}>Patient name</CustomTitle>
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Date:
            </CustomTitle>
            <Text style={styles.text}>{detials.date}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Speciality:
            </CustomTitle>
            <Text style={styles.text}>{detials.speciality}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Complain:
            </CustomTitle>
            <Text style={styles.text}>{detials.complain}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Diagnosis:
            </CustomTitle>
            <Text style={styles.text}>{detials.diagnosis}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Report:
            </CustomTitle>
            <Text style={styles.text}>{detials.report}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Medication:
            </CustomTitle>
            <Text style={styles.text}>{detials.medication}</Text>
            
            <CustomTitle titleStyle={{color: 'black', fontSize: 20}}>
                Checks:
            </CustomTitle>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>    
                <Text style={styles.text}>{detials.checks}</Text>
                <TouchableOpacity onPress={documents}>
                    <Text style={styles.button}>View</Text>
                </TouchableOpacity>
            </View>

            <CustomTitle titleStyle={{color: 'black', fontSize: 20, alignItems: 'center'}}>
                Operations:
            </CustomTitle>
            <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
                <Text style={styles.text}>{detials.operations}</Text>
                {/* <TouchableOpacity>
                    <Text style={styles.button}>View</Text>
                </TouchableOpacity> */}
            </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    paddingTop: '10%',
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#f0f0f0', 
  },
  text: {
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    padding: 5,
    borderRadius: 15,
    fontSize: 15,
    width: 70,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#1565c0'
  }
})

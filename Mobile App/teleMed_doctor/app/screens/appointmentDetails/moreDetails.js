import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import SafeArea from "../../components/safeArea";
import Footer from "../../components/footer";
import Custombutton from "../../components/button";
import CustomTitle from "../../components/title";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Details({ navigation }) {
  const [message, setMessage] = useState("");
  return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{ margin: 20 }}>Patient Name</CustomTitle>
        <View style={styles.box}>
          <Text style={styles.sent}>sent</Text>
          <Text style={styles.recieved}>recieved</Text>
          <View style={styles.input}>
            <TextInput
              placeholder="Ask the patient ..."
              multiline={true}
              value={message}
              onChange={setMessage}
              // style={styles.input}
            />
            <TouchableOpacity>
              <Ionicons name="send" size={24} color='#1565c0' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Footer navigation={navigation} /> */}
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  input: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    bottom: '3%',
    // left: 0,
    // right: 0,
    backgroundColor: "white",
    width: 330,
    borderRadius: 20,
    padding: 10,
    // textAlignVertical: "top",
    // marginTop: "50%",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  box: {
    backgroundColor: 'white',
    width: '95%',
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray'
  },
  recieved: {
    position: 'absolute',
    bottom: '12%',
    left: 5,
    backgroundColor: 'gray',
    borderRadius: 10,
    color: 'white',
    width: '80%',
    padding: 5,

  },
  sent: {
    position: 'absolute',
    bottom: '18%',
    right: 5,
    backgroundColor: '#1565c0',
    borderRadius: 10,
    color: 'white',
    width: '80%',
    padding: 5,

  }
});

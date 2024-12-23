import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import SafeArea from "../../components/safeArea";
import Footer from "../../components/footer";
import Custombutton from "../../components/button";
import CustomTitle from "../../components/title";

export default function Details({ navigation }) {
  const [message, setMessage] = useState("");
  return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{ margin: 20 }}>Chat</CustomTitle>
        <TextInput
          placeholder="Ask the patient ..."
          multiline={true}
          value={message}
          onChange={setMessage}
          style={styles.input}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
          <Custombutton buttonStyle={{ width: 70 }}>Send</Custombutton>
        </View>
      </View>
      <Footer navigation={navigation} />
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
    backgroundColor: "white",
    width: 300,
    height: 100,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    marginTop: "50%",
    borderWidth: 1,
    borderColor: "lightgray",
  },
});

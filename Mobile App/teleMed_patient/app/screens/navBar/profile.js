import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../../components/safeArea";
import Custombutton from "../../components/button";
import Footer from "../../components/footer";
import CustomScroll from "../../components/scroll";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { appointments } from "../../test/data";

export default function Profile({ navigation }) {
  const [patieneInfo, setpatieneInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token !== null) {
        // Token retrieved
        return token;
      }
    } catch (e) {
      // error reading value
      console.log("Error retrieving token", e);
    }
    return null;
  };

  const fetchpatieneInfo = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/patient/profile/info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );
      if (!response.ok) {
        await AsyncStorage.removeItem("userToken");
        navigation.navigate("sign in");
        response.json().then((data) => {
          console.log("Failed:", data);
        });
        throw new Error("Failed to get your profile please try again");
      }
      const data = await response.json();
      setpatieneInfo(data.formattedPatient);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchpatieneInfo();
    }, []) // Empty dependency array
  );

  // navigation to pending appointments
  const requests = () => {
    navigation.navigate('request')
  }

  // navigation to history
  const history = () => {
    navigation.navigate('past appointments')
  }

  // navigation to coming appointments
  const upcoming = () => {
    navigation.navigate('appointment')
  }

  // navigation to wallet
  const wallet = () => {
    navigation.navigate('wallet')
  }

  const logOut = async () => {
    try {
      // Remove token from AsyncStorage
      await AsyncStorage.removeItem("userToken");

      // Double-check by trying to get the token to confirm deletion
      const token = await AsyncStorage.getItem("userToken");

      // If the token no longer exists, navigate to Sign In screen
      if (!token) {
        navigation.navigate("sign in"); // Ensure the route name is correctly typed
      } else {
        console.log("Error: Token still exists after deletion"); // Debugging message
      }
    } catch (e) {
      console.log("Error during logout:", e); // Handle errors gracefully
    }
  };

  const changePassword = () => {
    navigation.navigate("changePassword");
  };

  const edit_info = (info) => {
    navigation.navigate("edit info", { info: info });
  };
  const renderProfileInfo = () => {
    const { firstName, lastName, email, gender, image, phone, languages } =
      patieneInfo;

    return (
      <View style={styles.card}>
        <View style={styles.profileRow}>
          <View>
            <Image
              source={
                image
                  ? { uri: image }
                  : require("../../../assets/images/pp.png")
              }
              style={styles.profileImage}
            />
            <TouchableOpacity onPress={() => edit_info(patieneInfo)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} />
              <Text style={styles.infoText}>{email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="call" size={20} />
              <Text style={styles.infoText}>{phone}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeArea>
      <CustomScroll>
        <View style={[styles.headerRow]}>
          <Text style={styles.title}>My Profile</Text>
          <View style={{ width: 48 }} />
        </View>

        {renderProfileInfo()}

        <View style={styles.card}>
          <Custombutton onPress={upcoming}>
            <Text style={styles.actionButtonText}>Coming Appointments</Text>
          </Custombutton>
          <Custombutton onPress={requests}>
            <Text style={styles.actionButtonText}>Pending Requests</Text>
          </Custombutton>
          <Custombutton onPress={history}>
            <Text style={styles.actionButtonText}>Appointments History</Text>
          </Custombutton>
          <Custombutton onPress={wallet}>
            <Text style={styles.actionButtonText}>My wallet</Text>
          </Custombutton>
          <Custombutton
            onPress={() => {
              changePassword();
            }}
          >
            <Text style={styles.passwordChangeText}>Change Password</Text>
          </Custombutton>
        </View>
        <TouchableOpacity onPress={logOut} style={styles.signOutButton}>
          <Ionicons name="log-out" size={25} color="red" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </CustomScroll>
      <Footer navigation={navigation} />
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  headerRow: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  backIcon: {
    color: "#1565c0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565c0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 16,
    marginBottom: 10, // Adjust the value as needed
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // Add a subtle shadow for Android
  },
  modalItem: {
    backgroundColor: "#f0f0f0", // Add a background color
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%", // Make items take full width
  },
  modalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Add spacing above the buttons
    width: "50%", // Adjust button width
    alignItems: "center", // Center the text
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  editButtonText: {
    color: "#1565c0",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#1565c0",
    width: 80,
    textAlign: "center",
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 16,
    color: "#333",
  },
  actionButton: {
    marginTop: 8,
    backgroundColor: "#1565c0",
    padding: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  passwordChangeText: {
    color: "#1de9b6",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  signOutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
    // marginBottom: '25%'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 10, // Add marginBottom here for spacing between button groups
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    // marginBottom: 10,  <-- Remove marginBottom from here
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
  signOutText: {
    color: "red",
    marginLeft: 8,
    fontSize: 16,
  },
});

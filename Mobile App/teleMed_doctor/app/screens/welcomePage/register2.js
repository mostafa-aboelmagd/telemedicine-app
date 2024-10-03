import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Alert,
  FlatList,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../../components/safeArea";
import Scroll from "../../components/scroll";
import Custombutton from "../../components/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTitle from "../../components/title";
import DatePicker from "react-native-date-picker";
import { Picker } from "@react-native-picker/picker"; // Import Picker for dropdown
import DropdownMenu from "../../components/dropdown";

export default function Register2({ navigation }) {
  // const { userData, handleSetUserData } = useContext(RegistrationContext);
  const [interests, setInterests] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const addInterest = () => {
    setInterests([...interests, { name: "", category: "" }]);
  };

  const handleLanguageSelection = (language) => {
    const isSelected = selectedLanguages.includes(language.value);

    if (isSelected) {
      // Remove the language if already selected
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language.value)
      );
    } else {
      // Add the language if not selected
      setSelectedLanguages([...selectedLanguages, language.value]);
    }
  };
  const availableLanguages = [
    { label: "English", value: "english" },
    { label: "French", value: "french" },
    { label: "Spanish", value: "spanish" },
    { label: "Arabic", value: "Arabic" },
  ];
  const handleInterestChange = (index, field, value) => {
    const updatedInterests = [...interests];
    updatedInterests[index][field] = value;
    setInterests(updatedInterests);
  };

  const submitRegistration = async () => {
    // Combine data from all pages (assuming userData is accessible)
    const finalData = {
      ...userData,
      certificates,
      experiences,
      interests,
      selectedLanguages,
    };
  
    console.log(JSON.stringify(finalData));
  
    // Send data to backend
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });
  
      if (!response.ok) {
        const error = await response.text();
        Alert.alert("Registration failed:", error);
        return;
      }
  
      // Handle successful registration (e.g., navigate to home)
      navigation.navigate("");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <SafeArea>
      <Scroll>
        <CustomTitle> Interests</CustomTitle>

        {interests.map((interest, index) => (
          <View key={index} style={styles.container2}>
            <TextInput
              placeholder="Interest"
              style={styles.container3}
              value={interest.name}
              onChangeText={(text) => handleInterestChange(index, "name", text)}
            />
            <TextInput
              placeholder=" Category"
              style={styles.container3}
              value={interest.category}
              onChangeText={(text) =>
                handleInterestChange(index, "category", text)
              }
            />
          </View>
        ))}

        <View style={{ width: "90%" }}>
          <Custombutton onPress={addInterest}>
            <Text>Add interest</Text>
          </Custombutton>
        </View>

        <View style={styles.container}>
          <CustomTitle>Languages</CustomTitle>
          <View style={styles.selectedLanguages}>
            <Text style={styles.selectedLanguageText}>Selected Languages:</Text>
            <View style={styles.selectedLanguageContainer}>
              {selectedLanguages.map((lang) => (
                <Text key={lang} style={styles.selectedLanguage}>
                  {lang}
                </Text>
              ))}
            </View>
          </View>
          <FlatList
            data={availableLanguages}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleLanguageSelection(item)}
                style={[styles.languageItem, styles.languageItemSelected]}
              >
                <Text style={styles.languageText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>

        <View style={{ width: "90%" }}>
          <Custombutton onPress={submitRegistration}>
            <Text>Submit registration</Text>
          </Custombutton>
        </View>
      </Scroll>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center", // Horizontal center
    backgroundColor: "#f0f0f0",
  },

  container1: {
    marginTop: "5%",
    alignItems: "center", // Horizontal center
  },

  container3: {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    margin: 10,
    textAlign: "center", // Centers the placeholder text
    backgroundColor: "white",
  },
  selectedLanguage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
    // Add your desired styling here
    backgroundColor: "#f0f0f0", // Example: Change background color
    padding: 5, // Example: Add padding
    borderRadius: 10, // Example: Add rounded corners
  },

  row: {
    flexDirection: "row",
  },

  text1: {
    color: "darkblue",
    fontSize: 30, // Added font size for better visibility
    marginTop: 10, // Space between image and text
  },

  text2: {
    color: "#1565c0",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: "20%",
  },

  input: {
    width: 270,
    height: 40,
    padding: 10,
  },

  icon: {
    flexDirection: "row",
    padding: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  link: {
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    marginBottom: 7,
  },

  text3: {
    marginBottom: 7,
  },

  sign: {
    color: "blue",
  },
  container: {
    flex: 1, // Allow component to fill available space if needed
    padding: 20,
  },
  selectedLanguages: {
    marginBottom: 10,
  },
  selectedLanguageText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectedLanguageContainer: {
    flexDirection: "row", // Arrange items horizontally
    flexWrap: "wrap", // Allow items to wrap to the next line if necessary
  },
  selectedLanguage: {
    fontSize: 14,
    color: "#333",
    marginBottom: 3,
    // Add your desired styling here
    backgroundColor: "#f0f0f0", // Example: Change background color
    padding: 5, // Example: Add padding
    borderRadius: 10, // Example: Add rounded corners
  },
  languageItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  languageItemSelected: {
    backgroundColor: "#eee", // Highlight selected item
  },
  languageText: {
    fontSize: 16,
  },
});

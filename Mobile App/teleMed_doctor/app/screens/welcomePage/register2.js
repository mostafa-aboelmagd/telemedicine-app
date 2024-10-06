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
import DropdownMenu from "../../components/dropdown";
import LocalStorage from "../../components/LocalStorage";
import map from "../../components/registration_map";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";

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
    if (interests && selectedLanguages) {
      Alert.alert("Sending Request...");
    } else {
      Alert.alert("All fields are required!");
    }
    // Send data to backend
    try {
      const personalInfo = await LocalStorage.getItem("personalInfo");
      const certificates = await LocalStorage.getItem("certificates");
      const experiences = await LocalStorage.getItem("experiences");
      // console.log(personalInfo,certificates,experiences);
      const finalData = {
        personalInfo,
        certificates,
        experiences,
        interests,
        selectedLanguages,
      };
      const mappedData = mapObjectToBackendFormat(finalData);
      console.log("final", JSON.stringify(mappedData));
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/doctor/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mappedData),
        }
      );
      if (!response.ok) {
        const error = await response.text();
        Alert.alert("Registration failed:", error);
        return;
      } else {
        // Handle successful registration (e.g., navigate to home)
        navigation.navigate("pending");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  function mapObjectToBackendFormat(inputObject) {
    // Parse the JSON strings for certificates and experiences
    const certificates = JSON.parse(inputObject.certificates);
    const experiences = JSON.parse(inputObject.experiences);

    // Create the output object with the desired structure
    const outputObject = {
      personalInfo: {
        firstName: inputObject.personalInfo.Fname,
        lastName: inputObject.personalInfo.Lname,
        birthdate: inputObject.personalInfo.birthdate.split("T")[0], // Extract date only
        city: inputObject.personalInfo.city,
        country: inputObject.personalInfo.country,
        email: inputObject.personalInfo.email,
        gender: inputObject.personalInfo.gender,
        location: inputObject.personalInfo.location,
        password: inputObject.personalInfo.password,
        phone: inputObject.personalInfo.phone,
        speciality: inputObject.personalInfo.speciality,
      },
      certificates: certificates.map((cert) => ({
        authority: cert.firm, // Assuming 'firm' maps to 'authority'
        endDate: cert.endDate.split("T")[0], // Extract date only
        name: cert.title, // Assuming 'title' maps to 'name'
        startDate: cert.startDate.split("T")[0], // Extract date only
      })),
      experiences: experiences.map((exp) => ({
        department: exp.certificateName, // Assuming 'certificateName' maps to 'department'
        endDate: exp.endDate.split("T")[0], // Extract date only
        firm: exp.certificateAuthority, // Assuming 'certificateAuthority' maps to 'firm'
        startDate: exp.startDate.split("T")[0], // Extract date only
        title: exp.title, // Assuming 'title' is present in the experience object
      })),
      interests: inputObject.interests, // No changes needed for 'interests'
      Languages: inputObject.selectedLanguages.map(
        (lang) => lang.charAt(0).toUpperCase() + lang.slice(1)
      ), // Capitalize languages
    };

    return outputObject;
  }

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

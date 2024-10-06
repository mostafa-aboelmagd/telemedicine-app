import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeArea from "../../components/safeArea";
import Scroll from "../../components/scroll";
import Custombutton from "../../components/button";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomTitle from "../../components/title";
import DropdownMenu from "../../components/dropdown";
import LocalStorage from "../../components/LocalStorage";
import dropdownlist from "../../components/DropDownOptions";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

export default function Register({ navigation }) {
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [currentPicker, setCurrentPicker] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [birth_date, setBirthDate] = useState(false);
  const screen2 = () => {
    if (
      Fname &&
      Lname &&
      email &&
      password &&
      confirmPassword &&
      phone &&
      gender &&
      country &&
      city &&
      location &&
      speciality
    ) {
      // Validate if password and confirm password match

      if (password !== confirmPassword) {
        Alert.alert("Error", "Confirm passwords do not match.");
        return;
      }
      // Validate password complexity (at least 8 characters, one number, and one special character)

      const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          "Invalid password. Password must be at least 8 characters, contain one number, and one special character."
        );
        return;
      }
      // Create an object to store personal information
      const personalInfo = {
        Fname,
        Lname,
        email,
        password,
        phone,
        gender: gender.label,
        country: country.label,
        city: city.label,
        location,
        speciality,
        birthdate: birth_date,
      };
      // Store personal information in local storage
      LocalStorage.setItem("personalInfo", personalInfo);
      // Navigate to the next registration screen (register1)

      navigation.navigate("register1");
    } else {
      // Display an alert if any required fields are missing

      Alert.alert("All fields are required!");
    }
  };
  const onBirthDateChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setBirthDate(selectedDate);
    }
    // Handle date picker visibility based on platform (Android or iOS)

    if (Platform.OS === "android") {
      setShowPicker(false);
      setIsPickerVisible(false);
    } else {
      setShowPicker(false);
    }
    setCurrentPicker(null);
  };
  // Get gender and country options from the dropdownlist component
  const genderOptions = dropdownlist("gender");
  const countries = dropdownlist("countries");
  // Navigate to the login page
  const login = () => {
    navigation.navigate("sign in");
  };
  // Function to navigate to the visitor support page
  const vsupport = () => {
    navigation.navigate("visitor support");
  };
  // Function to handle country selection and reset city selection
  const handleCountrySelect = (country) => {
    setCountry(country);
    setCity(null);
  };
  // Function to handle city selection
  const handleCitySelect = (city) => {
    setCity(city);
  };
  const showDatePicker = (pickerType) => {
    setCurrentPicker(pickerType);

    setShowPicker(true);
    setIsPickerVisible(Platform.OS === "android");
  };

  return (
    // input fields are
    <SafeArea>
      <Scroll>
        <View style={styles.container}>
          <View>
            <CustomTitle>Register</CustomTitle>
            {/* Input fields for user registration */}

            <View style={[styles.container3, { marginTop: "20%" }]}>
              <TextInput
                placeholder="First Name"
                value={Fname}
                onChangeText={setFName}
                style={styles.input}
              />
            </View>
            <View style={[styles.container3]}>
              <TextInput
                placeholder="Last Name"
                value={Lname}
                onChangeText={setLName}
                style={styles.input}
              />
            </View>
            <View style={styles.container3}>
              <TextInput
                placeholder="example@gmail.com"
                keyboardType="email-address"
                inputType="email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
            </View>
            <View style={styles.container3}>
              <TextInput
                placeholder="phone number"
                keyboardType="phone"
                inputType="phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
              />
            </View>
            {/* <View
              style={[
                styles.cell,
                { flexDirection: "row", paddingHorizontal: 5 },
              ]}
            ></View> */}
            <View
              style={[
                styles.container3,
                { flexDirection: "row", paddingHorizontal: 5 },
              ]}
            >
              <TouchableOpacity onPress={() => showDatePicker("start")}>
                <Text style={styles.container3}>
                  {birth_date
                    ? new Date(birth_date).toDateString()
                    : "Birth Date"}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <DropdownMenu
                options={genderOptions}
                onSelect={setGender}
                placeholder="Select gender"
              />
            </View>
            {/* ... dropdown menus for country and city */}

            <View>
              <DropdownMenu
                options={countries}
                onSelect={handleCountrySelect}
                placeholder="Select a country"
              />
              {country && (
                <DropdownMenu
                  options={country ? country.cities : []}
                  onSelect={handleCitySelect}
                  placeholder="Select a city"
                  renderItem={({ item }) => <Text>{item.label}</Text>}
                />
              )}
            </View>
            <View style={styles.container3}>
              <TextInput
                placeholder="location"
                keyboardType="location"
                inputType="location"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
              />
            </View>

            <View style={styles.container3}>
              <TextInput
                placeholder="Your Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
              />
            </View>

            <View style={styles.container3}>
              <TextInput
                placeholder="Confirm your Password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setconfirmPassword}
                style={styles.input}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.container3}>
              <TextInput
                placeholder="Speciality"
                value={speciality}
                onChangeText={setSpeciality}
                style={styles.input}
              />
            </View>
            {/* Link to the login page */}

            <View style={styles.row}>
              <Text style={styles.text3}>Already have an account?</Text>
              <Pressable style={styles.link} onPress={login}>
                <Text style={styles.sign}> Sign in </Text>
              </Pressable>
            </View>
          </View>
          {/* Next button to proceed to the next registration screen */}

          <View style={{ width: "90%" }}>
            <Custombutton onPress={screen2}>
              <Text>Next </Text>
            </Custombutton>
          </View>
          {/* Support button */}

          <TouchableOpacity
            onPress={vsupport}
            style={{ alignItems: "center", marginTop: "10%" }}
          >
            <AntDesign name="customerservice" size={40} color="black" />
            <Text style={{ fontWeight: "bold" }}>Support</Text>
          </TouchableOpacity>
        </View>
        {/* Date picker component (conditionally rendered) */}

        {(showPicker || isPickerVisible) && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onBirthDateChange}
          />
        )}
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
    textAlign: "center", // Centers the placeholder text
    margin: 10,
    backgroundColor: "white",
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
});

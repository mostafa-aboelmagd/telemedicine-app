import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Pressable,
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
  const [birth_date, setBirthDate] = useState(new Date()); // Initialize as a Date object
  const [showDatePicker, setShowDatePicker] = useState(false);

  // const birthdate1 = formatBirthdate(birth_day, birth_month, birth_year);
  const showDatePickerHandler = () => {
    setShowDatePicker(true); // Set to true to show the date picker
  };
  const handleBirthDateChange = (text) => {
    // Regex for valid date format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!text) {
      // Set birthDate to null or some default value
      setBirthDate(null);
      return;
    }
    if (!dateRegex.test(text)) {
      // Show an error message or highlight the input
      return;
    }

    // Create a Date object from the validated string
    const newDate = new Date(text);
    setBirthDate(newDate);
    // setShowDatePicker(false);
  };
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
      if (password !== confirmPassword) {
        Alert.alert("Error", "Confirm passwords do not match.");
        return;
      }
      const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          "Invalid password. Password must be at least 8 characters, contain one number, and one special character."
        );
        return;
      }
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
      console.log(personalInfo);
      console.log(JSON.stringify(personalInfo));
      LocalStorage.setItem("personalInfo", personalInfo);
      navigation.navigate("register1");
    } else {
      Alert.alert("All fields are required!");
    }
  };
  // call arrays from DropDownMinue file
  const genderOptions = dropdownlist("gender");
  const countries = dropdownlist("countries");
  // navigate to login page
  const login = () => {
    navigation.navigate("sign in");
  };
  // navigate to support page
  const vsupport = () => {
    navigation.navigate("visitor support");
  };
  // handle selections of country from the array
  const handleCountrySelect = (country) => {
    setCountry(country);
    setCity(null);
  };
  // handle the selection of citis for tha same country from the array
  const handleCitySelect = (city) => {
    setCity(city);
  };

  return (
    // input fields are
    <SafeArea>
      <Scroll>
        <View style={styles.container}>
          <View>
            <CustomTitle>Register</CustomTitle>
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
            <Text>Birth date</Text>
            <View style={styles.dateRow}>
              <View style={styles.cell}>
                <Text style={styles.textProp}>Start Date:</Text>
                {inputSet.startDate ? (
                  <Text style={styles.inTextProp}>
                    {new Date(inputSet.startDate).toDateString()}
                  </Text>
                ) : (
                  <Text style={styles.inTextProp}>No date selected</Text>
                )}
              </View>
              <View style={styles.cell}>
                <Text style={styles.textProp}>End Date:</Text>
                {inputSet.endDate ? (
                  <Text style={styles.inTextProp}>
                    {new Date(inputSet.endDate).toDateString()}
                  </Text>
                ) : (
                  <Text style={styles.inTextProp}>No date selected</Text>
                )}
              </View>
            </View>
            {/* <View style={styles.container3}>
              <TextInput
                placeholder="birthdate"
                value={format(birth_date, "yyyy-MM-dd")} // Format the date as yyyy-MM-dd
                onChange={handleBirthDateChange(new Date(text))}
                style={styles.input}
                onFocus={showDatePickerHandler}
              />
              <TouchableOpacity onPress={showDatePickerHandler}>
                <MaterialIcons name="calendar-today" size={24} color="gray" />
              </TouchableOpacity>
              {showDatePicker && ( // Render only when showDatePicker is true
                <DateTimePicker
                  mode="date"
                  value={birth_date}
                  onChange={handleBirthDateChange}
                  visible={showDatePicker}
                  onDismiss={showDatePickerHandler} // Hide the date picker when dismissed
                />
              )}
            </View> */}
            <View>
              <DropdownMenu
                options={genderOptions}
                onSelect={setGender}
                placeholder="Select gender"
              />
            </View>
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

            <View style={styles.row}>
              <Text style={styles.text3}>Already have an account?</Text>
              <Pressable style={styles.link} onPress={login}>
                <Text style={styles.sign}> Sign in </Text>
              </Pressable>
            </View>
          </View>

          <View style={{ width: "90%" }}>
            <Custombutton onPress={screen2}>
              <Text>Next </Text>
            </Custombutton>
          </View>
          <TouchableOpacity
            onPress={vsupport}
            style={{ alignItems: "center", marginTop: "10%" }}
          >
            <AntDesign name="customerservice" size={40} color="black" />
            <Text style={{ fontWeight: "bold" }}>Support</Text>
          </TouchableOpacity>
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

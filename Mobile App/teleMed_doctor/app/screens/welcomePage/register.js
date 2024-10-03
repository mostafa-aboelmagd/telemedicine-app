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
import countries from "../../components/DropDownOptions";

export default function Register({ navigation }) {
  const [Fname, setFName] = useState("");
  const [Lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const screen2 = () => {
    if (
      Fname &&
      Lname &&
      email &&
      password &&
      conf &&
      phone &&
      gender &&
      country &&
      city &&
      location &&
      speciality
    ) {
      const personalInfo = {
        Fname,
        Lname,
        email,
        password,
        phone,
        gender:gender.label,
        country:country.label,
        city:city.label,
        location,
        speciality,
        birthdate,
      };
      console.log(personalInfo);
      console.log(JSON.stringify(personalInfo));
      LocalStorage.setItem('personalInfo', personalInfo);
      navigation.navigate("register1");
    } else {
      Alert.alert("All fields are required!");
    }
  };
  // set gender options.
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  // set country &city options
  const countries = [
    {
      label: "Egypt",
      cities: [
        { label: "Cairo" },
        { label: "Alexandria" },
        { label: "Giza" },
        { label: "Luxor" },
        { label: "Aswan" },
        { label: "Sharm El Sheikh" },
        { label: "Hurghada" },
        { label: "Dahab" },
        { label: "Marsa Alam" },
        { label: "El Alamein" },
      ],
    },
    {
      label: "Saudi Arabia",
      cities: [
        { label: "Riyadh" },
        { label: "Jeddah" },
        { label: "Mecca" },
        { label: "Medina" },
        { label: "Dammam" },
        { label: "Taif" },
        { label: "Al Khobar" },
        { label: "Yanbu" },
        { label: "Jubail" },
        { label: "Hail" },
      ],
    },
    {
      label: "Jordan",
      cities: [
        { label: "Amman" },
        { label: "Aqaba" },
        { label: "Irbid" },
        { label: "Zarqa" },
        { label: "Balqa" },
        { label: "Madaba" },
        { label: "Ajloun" },
        { label: "Jerash" },
        { label: "Mafraq" },
        { label: "Karak" },
      ],
    },
    {
      label: "Emirates",
      cities: [
        { label: "Dubai" },
        { label: "Abu Dhabi" },
        { label: "Sharjah" },
        { label: "Ajman" },
        { label: "Fujairah" },
        { label: "Ras Al Khaimah" },
        { label: "Umm Al Quwain" },
        { label: "Al Ain" },
        { label: "Hatta" },
        { label: "Khor Fakkan" },
      ],
    },
  ];
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
            <View style={styles.container3}>
              <TextInput
                placeholder="Birth Date"
                keyboardType="Birth Date"
                inputType="Birth Date"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
              />
            </View>
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
                value={conf}
                onChangeText={setConf}
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

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import LocalStorage from "../../components/LocalStorage";
import SafeArea from "../../components/safeArea";
import { doctorAv } from "../../test/data";
import CustomScroll from "../../components/scroll";
import CustomTitle from "../../components/title";
import { getToken } from "../../components/getToken";
import { NEXT_PUBLIC_SERVER_NAME } from "@env";
import { Calendar } from "react-native-calendars";

let newSlots = [];
let removedSlots = [];
let selectedSlotsOfDays = {};
export default function Follow_up({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Store selected date
  const [availabilityData, setAvailabilityData] = useState(null); // Store fetched data
  //   const [slots, setSlots] = useState(null);
  const [slotdaycode, setslotdaycode] = useState(null);
  const [slothourcode, setslothourcode] = useState(null);
  const [slottypecode, setslottypecode] = useState(null);

  const [complaint, setComplaint] = useState(""); // State to store complaint
  const [booked, setBooked] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState("L");
  const [slotduration, setslotduration] = useState(30);
  const [selectedDay, setSelectedDay] = useState("sat");
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [userInput, setUserInput] = useState("");
  const decodeSlots = (slotsString) => {
    const decodedSlots = {};
    if (slotsString) {
      slotsString.split(",").forEach((timeslot) => {
        const [day, slot, status] = timeslot.split("_");
        const key = days[day];
        if (!decodedSlots[key]) {
          decodedSlots[key] = [];
        }
        decodedSlots[key].push([slot, status]);
      });
    }
    return decodedSlots;
  };
  const days = {
    1: "sat",
    2: "sun",
    3: "mon",
    4: "tue",
    5: "wed",
    6: "thu",
    7: "fri",
  };

  const [hours, setHours] = useState({
    "01": false,
    "02": false,
    "03": false,
    "04": false,
    "05": false,
    "06": false,
    "07": false,
    "08": false,
    "09": false,
    10: false,
    11: false,
    12: false,
  });

  // Online / On-site switch
  const online = () => {
    isOnline === "L" ? setIsOnline("S") : setIsOnline("L");
  };
  const duration = () => {
    slotduration === 30 ? setslotduration(60) : setslotduration(30);
  };

  // Slots filtering
  const filtered = (slot) => {
    const decoded = decodeSlots(availabilityData?.available_slots);
    const dayOfWeek = days[new Date(selectedDate).getDay() + 1]; // Get day of the week for selectedDate
    if (decoded[dayOfWeek]) {
      return decoded[dayOfWeek]
        .filter((element) => element[1] === isOnline)
        .find((element) => element[0] === slot);
    }
    return false;
  };

  const chosenSlot = async (selectedDay, hour, state) => {
    const dayOfWeek = new Date(selectedDate).getDay() + 1; // Day of the week for selectedDate
    console.log(dayOfWeek, hour, state);
    setslotdaycode(dayOfWeek);
    setslothourcode(hour);
    setslottypecode(state);
    // Check for conflicts with availabilityData (You'll need to implement this logic)
    const hasConflict = checkForConflicts(dayOfWeek, hour, state);
    if (hasConflict) {
      // Display an error message or prevent further action
      alert("This slot is not valid.");
      return;
    }
    setModalVisible(true);
    // Wait for the modal to be submitted
  };
  const bookfollowup = async (comp) => {
    const dayOfWeek = new Date(selectedDate).getDay() + 1;
    const slotHour = parseInt(slothourcode, 10) + 8; // Add 8 to convert to 24-hour format
    const formattedHour = slotHour < 10 ? `0${slotHour}` : `${slotHour}`;
    const dateTime = `${selectedDate}T${formattedHour}:00:00.000Z`;
    console.log(dateTime);
    const appointment_id = await LocalStorage.getItem(
      "appointment_id",
      appointment_id
    );
    const appointmentbody= JSON.stringify({
        time_slot_code: `${slotdaycode}_${slothourcode}_${slottypecode}`,
        appointment_date: dateTime,
        complaint: comp,
        duration: slotduration
      })
      console.log(appointmentbody);
    // Send data to backend
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/patient/appointment/followup/book/${appointment_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
          body: appointmentbody
        }
      );

      // ... handle response
    } catch (error) {
      console.error("Error booking follow-up:", error);
    }
  };

  const checkForConflicts = (dayOfWeek, hour, state) => {
    // Implement your logic to check for conflicts with availabilityData
    // Return true if there is a conflict, false otherwise
    const decoded = decodeSlots(availabilityData?.available_slots);
    return decoded[days[dayOfWeek]]?.find(
      (s) => s[0] === hour && s[1] === state
    );
  };
  const getSlotTime = (slot) => {
    const slotHour = parseInt(slot, 10) + 8; // Slots start at 9am (hour 01)
    const formattedHour = slotHour < 10 ? `0${slotHour}` : `${slotHour}`;
    return `${formattedHour}:00:00.000Z`;
  };
  const getStyle = (slot) => {
    if (isSlotBooked(selectedDate, slot)) {
      return styles.slot;
    }

    if (filtered(slot)) {
      return styles.slot;
    } else {
      return [
        styles.slot,
        hours[slot]
          ? { backgroundColor: "#002e07" }
          : { backgroundColor: "green" },
      ];
    }
  };
  // Fetching doctor availability
  const getAvailabilSlots = async () => {
    try {
      const response = await fetch(
        `${NEXT_PUBLIC_SERVER_NAME}/patient/appointment/Availabilities/13`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok", response);
      }

      const result = await response.json();
      setAvailabilityData(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching doctor availability:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAvailabilSlots();
  }, [loading]);

  const isSlotBooked = (date, slot) => {
    if (availabilityData && availabilityData.booked) {
      const formattedDate = new Date(date).toISOString().split("T")[0]; // Format date
      const slotTime = getSlotTime(slot); // Get time for the slot (e.g., "11:00:00.000Z")
      const bookedDateTime = `${formattedDate}T${slotTime}`;
      return availabilityData.booked.includes(bookedDateTime);
    }
    return false;
  };
  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#f0f0f0",
        }}
      >
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <SafeArea>
      <View style={styles.container}>
        <CustomTitle titleStyle={{ textAlign: "center" }}>
          Follow up appointment
        </CustomTitle>
        <Calendar
          onDayPress={(day) => {
            const today = new Date();
            const selectedDay = new Date(day.dateString);
            if (selectedDay >= today) {
              setSelectedDate(day.dateString);
            }
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              disableTouchEvent: true,
              selectedDotColor: "orange",
            },
          }}
          minDate={new Date().toISOString().split("T")[0]} // Format date as YYYY-MM-DD
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        ></View>
        <CustomScroll>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "01", isOnline)}
            >
              <Text style={getStyle("01")}>09:00 am</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "02", isOnline)}
            >
              <Text style={getStyle("02")}>10:00 am</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "03", isOnline)}
            >
              <Text style={getStyle("03")}>11:00 am</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "04", isOnline)}
            >
              <Text style={getStyle("04")}>12:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "05", isOnline)}
            >
              <Text style={getStyle("05")}>01:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "06", isOnline)}
            >
              <Text style={getStyle("06")}>02:00 pm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "07", isOnline)}
            >
              <Text style={getStyle("07")}>03:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "08", isOnline)}
            >
              <Text style={getStyle("08")}>04:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "09", isOnline)}
            >
              <Text style={getStyle("09")}>05:00 pm</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "10", isOnline)}
            >
              <Text style={getStyle("10")}>06:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "11", isOnline)}
            >
              <Text style={getStyle("11")}>07:00 pm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => chosenSlot(selectedDay, "12", isOnline)}
            >
              <Text style={getStyle("12")}>08:00 pm</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity onPress={online}>
              <Text style={styles.button}>
                {isOnline == "L" ? "Online" : "On-site"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={duration}>
              <Text style={styles.button}>
                {slotduration == 30 ? "30 min" : "60 min"}
              </Text>
            </TouchableOpacity>
          </View>
        </CustomScroll>
        <Text style={styles.message}>"{message}"</Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.done}>Set</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setUserInput}
              value={userInput}
              placeholder="Enter your complaint"
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => bookfollowup(userInput)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: "#f0f0f0",
    marginTop: "10%",
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderColor: "lightgray",
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
  slot: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 10,
    color: "white",
    width: 105,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  switch: {
    marginRight: 10,
  },
  switchTextRemove: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  switchTextAdd: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    margin: 10,
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    fontSize: 18,
    width: 100,
    textAlign: "center",
    color: "#1565c0",
    borderColor: "#1565c0",
  },
  done: {
    position: "absolute",
    bottom: 10, // Distance from the bottom of the page
    left: "37%", // Optional: Adjust the distance from the left/right
    padding: 5,
    borderRadius: 15,
    fontSize: 20,
    width: 100,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#1565c0",
    borderWidth: 1,
    borderColor: "darkgray",
  },
  message: {
    position: "absolute",
    bottom: 160, // Distance from the bottom of the page
    left: "15%", // Optional: Adjust the distance from the left/right
    padding: 5,
    fontSize: 18,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,

    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    width: "100%",
    textAlignVertical: "top", // Allow multiline input
  },
  durationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
  },
});

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet,ScrollView  } from "react-native";
const DropdownMenu = ({ options, onSelect, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text style={styles.dropdownLabel}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
      </TouchableOpacity>
        {isOpen && (
        <ScrollView style={styles.dropdownOptions}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.dropdownOption}>{option.label}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    textAlign: "center",
  },
  dropdownOptions: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    maxHeight: 150,
    textAlign: "center", // Set maximum height for 5 items (adjust as needed)
  },
  dropdownOption: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
});

export default DropdownMenu;





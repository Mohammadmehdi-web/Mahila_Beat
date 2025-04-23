import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const Search = ({handleChange}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);

  return (
    <View>
      {/* Header with Dropdown Arrow */}
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.headerText}>जानकारी से खोजें</Text>
        <Icon 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#fff" 
        />
      </TouchableOpacity>

      {/* Collapsible Content */}
      {isExpanded && (
        <View style={styles.container}>

          {/* Date Pickers */}
          <View style={styles.dateContainer}>
            <Text style={styles.label}>कब से</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowFromDatePicker(true)}
            >
              <Text>{fromDate.toLocaleDateString()}</Text>
              <Icon name="calendar" size={24} color="#333" />
            </TouchableOpacity>
            {showFromDatePicker && (
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFromDatePicker(false);
                  if (selectedDate) setFromDate(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.dateContainer}>
            <Text style={styles.label}>कब तक</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowToDatePicker(true)}
            >
              <Text>{toDate.toLocaleDateString()}</Text>
              <Icon name="calendar" size={24} color="#333" />
            </TouchableOpacity>
            {showToDatePicker && (
              <DateTimePicker
                value={toDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowToDatePicker(false);
                  if (selectedDate) setToDate(selectedDate);
                }}
              />
            )}
          </View>

          {/* Search Button */}
          <TouchableOpacity style={styles.searchButton} onPress={() => handleChange(selectedArea, fromDate.toISOString().split("T")[0], toDate.toISOString().split("T")[0])}>
            <Text style={styles.searchButtonText}>सर्च करें</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#D84315",
    padding: 15,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    elevation: 3,
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    width: "100%",
    color:'black'
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Search;

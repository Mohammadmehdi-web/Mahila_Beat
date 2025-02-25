import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ title, onMenuPress, onProfilePress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Icon name="checkmark-circle-outline" size={20} color="white" />
        <Text style={styles.title}>{title}</Text>
      </View>

      <TouchableOpacity onPress={onProfilePress}>
        <Icon name="person-circle-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2196F3", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 4, 
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Header;

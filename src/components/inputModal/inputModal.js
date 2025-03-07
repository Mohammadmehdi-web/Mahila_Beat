import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

const InputModal = ({label, placeholderText, isVisible, onClose,beatName,handleChange, handleSubmit, navigation}) => {

  const userDetails = useSelector(state => state.auth.userDetails)
  
  return (
      <Modal
      visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
        propagateSwipe={true}
      >
        <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <TextInput 
            style={styles.input}
            value={beatName}
            onChangeText={handleChange}
            placeholder={placeholderText}
            placeholderTextColor="grey"
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
              <Icon name="pencil" size={20} color="white" />
              <Text style={styles.updateText}>{label}</Text>
            </TouchableOpacity>
          </View>
          </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    // </View>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#",
  },
  input:{
    width:'100%',
    borderWidth: 1,
     borderRadius:10,
    padding: '3%',
    color:'black'
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: '10%',
    alignItems: "center",
    elevation: 5,
    gap:20
  },
  closeButton: {
    position: "absolute",
    top: '3%',
    left: '4%',
  },
  loginId: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: '2%',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#C2185B",
  },
  value: {
    fontSize: 14,
    color: "black",
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    gap:5
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InputModal;

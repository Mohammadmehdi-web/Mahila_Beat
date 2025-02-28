import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Modal from 'react-native-modal'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const UserInfoCard = ({isVisible, onClose, navigation}) => {
  
  return (
    // <View style={styles.container}>
    //   {/* Profile Modal */}
      <Modal
      isVisible={isVisible}
        transparent
        animationType="fade"
        propagateSwipe={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.loginId}>Login ID: 6393929234</Text>

            <View style={styles.infoContainer}>
              <Text style={styles.label}>नाम</Text>
              <Text style={styles.value}>30नि0 श्री देवेंद्र सिंह</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>जनपद</Text>
              <Text style={styles.value}>आगरा</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>थाना</Text>
              <Text style={styles.value}>एतमादपुर</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>मोबाइल नं0</Text>
              <Text style={styles.value}>6393929234</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>पी.एन.ओ.</Text>
              <Text style={styles.value}>9630300058</Text>
            </View>

            <TouchableOpacity style={styles.updateButton}>
              <Icon name="pencil" size={20} color="white" />
              <Text style={styles.updateText}>Update Info</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  loginId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default UserInfoCard;

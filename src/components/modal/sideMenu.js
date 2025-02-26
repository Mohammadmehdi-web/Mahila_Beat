import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SideModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Button to Open Modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
      >
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.5}
        style={styles.modalStyle}
      >
        <View style={styles.modalContent}>
          {/* Header Section with Logo */}
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Logo_of_Uttar_Pradesh_Police.svg/1200px-Logo_of_Uttar_Pradesh_Police.svg.png",
              }}
              style={styles.logo}
            />
            <Text style={styles.title}>आगरा जोन पुलिस</Text>
            <Text style={styles.subtitle}>सुरक्षा आपकी संकल्प हमारा</Text>
          </View>

          {/* Menu Items */}
          <ScrollView>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => setModalVisible(false)}
              >
                <Icon
                  name={item.icon}
                  size={24}
                  color="#C2185B"
                  style={styles.icon}
                />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeText}>बंद करें</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

// Menu Items
const menuItems = [
  { label: "🏠 एप होम", icon: "home" },
  { label: "📊 डैशबोर्ड", icon: "view-dashboard" },
  { label: "➕ मेरी बीट", icon: "plus-box" },
  { label: "❌ लंबित शिकायत", icon: "alert-circle" },
  { label: "✅ निस्तारित शिकायत", icon: "check-circle" },
  { label: "📜 सभी शिकायत", icon: "file-document" },
  { label: "🚔 सभी भ्रमण", icon: "car" },
  { label: "🚶‍♂️ आपके भ्रमण", icon: "walk" },
  { label: "🚪 लॉग आउट", icon: "logout" },
];

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#C2185B",
    padding: 10,
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2185B",
  },
  subtitle: {
    fontSize: 12,
    color: "#C2185B",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#C2185B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SideModal;

import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity,Image,Text,ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header';
import WomenBeatCard from '../../components/womenBeatCard/womenBeatCard';

const MeriBeat = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {label: ' एप होम', icon: 'home', screen:'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen:"Dashboard"},
    {label: ' मेरी बीट', icon: 'plus-box'},
    {label: ' लंबित शिकायत', icon: 'alert-circle',screen:"CompletedComplaints"},
    {label: ' निस्तारित शिकायत', icon: 'check-circle'},
    {label: ' सभी शिकायत', icon: 'file-document'},
    {label: ' सभी भ्रमण', icon: 'car'},
    {label: ' आपके भ्रमण', icon: 'walk'},
    {label: ' लॉग आउट', icon: 'logout', screen:'Login'},
  ];
  return (
    <>
        <Modal
          isVisible={modalVisible}
          coverScreen
          onBackdropPress={() => setModalVisible(false)}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          backdropOpacity={0.5}
          style={{margin:0}}>
          <View style={styles.modalContent}>
            {/* Header Section with Logo */}
            <View style={styles.header}>
              <Image
                source={Logo}
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
                  onPress={() => navigation.navigate(item.screen)}>
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
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>बंद करें</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true) }
          onProfilePress={() => console.log('Profile Pressed')}
        />
        <WomenBeatCard 
        onPress={() => navigation.navigate('DetailsScreen')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  modalContent: {
    width: "70%",
    backgroundColor: "#FFF",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    alignItems: "flex-start",
    gap:20
  },
  header: {
    width:"100%",
    alignItems: "center",
    backgroundColor:"#EFDCAB"
  },
  logo: {
    width: "60%",
    height: 100,
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
    paddingLeft:"6%",
    gap: 10
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

export default MeriBeat;

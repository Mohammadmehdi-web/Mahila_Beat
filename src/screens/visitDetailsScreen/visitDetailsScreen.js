import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from 'react-native-modal';

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard'; 

const VisitDetailsScreen = ({ navigation }) => {
      const [modalVisible, setModalVisible] = useState(false);
    
      const menuItems = [
        {label: ' एप होम', icon: 'home', screen:'Home'},
        {label: ' डैशबोर्ड', icon: 'view-dashboard', screen:"Dashboard"},
        {label: ' मेरी बीट', icon: 'plus-box',screen:"MeriBeat"},
        {label: ' लंबित शिकायत', icon: 'alert-circle',screen:"ComplaintList"},
        {label: ' निस्तारित शिकायत', icon: 'check-circle',screen:"CompletedComplaints"},
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

      <Header title="महिला बीट" onMenuPress={() => setModalVisible(true)} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Patrolling Details Section */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>वर्तमान भ्रमण की जानकारी / कार्यवाही</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>बीट का नाम</Text>
            <Text style={styles.dateText}>महिला बीट 2</Text>

            <Text style={styles.label}>गांव / मोहल्ला का नाम</Text>
            <Text style={styles.dateText}>अमर कालोनी</Text>

            <Text style={styles.label}>भ्रमण में सहकर्मी का नाम</Text>
            <Text style={styles.redText}>कां0 4961 अभिषेक शर्मा, कां0 3010 श्री देवेंद्र सिंह</Text>

            <Text style={styles.label}>भ्रमण का दिनांक व समय</Text>
            <Text style={styles.dateText}>Oct 23, 2021 12:52PM</Text>

            <Text style={styles.label}>गांव / मोहल्ला की लोकेशन से दूरी</Text>
            <Text style={styles.dateText}>599.4 मीटर</Text>
          </View>

          {/* Patrolling Actions */}
          <View style={styles.actionContainer}>
          <Text style={styles.actionTitle}>भ्रमण की कार्यवाही</Text>
      {/* First row with two buttons */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.purpleButton]} onPress={() => navigation.navigate('SamvadDetails')}>
          <Text style={styles.buttonText}>संवाद / जागरूकता</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purpleButton]} onPress={() => navigation.navigate('ComplaintScreen')}>
          <Text style={styles.buttonText}>शिकायत निराकरण</Text>
        </TouchableOpacity>
      </View>

      {/* Second row with single centered button */}
      <TouchableOpacity style={[styles.button, styles.orangeButton]}>
        <Text style={styles.buttonText}>भ्रमण की जानकारी</Text>
      </TouchableOpacity>
    </View>

          {/* Close Patrol Button */}
          <TouchableOpacity style={styles.closePatrolButton}>
            <Icon name="close-circle" size={18} color="#fff" />
            <Text style={styles.closePatrolText}>भ्रमण को बन्द करें</Text>
          </TouchableOpacity>

          {/* Complaint Summary Section */}
          <View style={styles.complaintSummary}>
            <Text style={styles.complaintSummaryText}>✅ कुल लंबित शिकायत 1</Text>
            <Icon name="refresh" size={18} color="green" />
          </View>

          {/* Complaint Card */}
          <ComplaintCard
            name="मोहित कुमार"
            phone="798739749375"
            category="पति पत्नी / घरेलू विवाद"
            address="उत्तर प्रदेश / आगरा / एसएनपुर / अमर कालोनी"
            date="Oct 21, 2021"
          />
        </View>
      </ScrollView>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 10,
  },
  
  detailsContainer: {
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    gap:10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: '5%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems:'center',
    gap:10
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  redText: {
    fontSize: 18,
    color: '#C2185B',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center'
  },
  dateText: {
    fontSize: 18,
    color: '#C2185B',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionContainer: {
    alignItems:'center',
    gap:10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    width:"40%",
    height:100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleButton: {
    backgroundColor: '#8E24AA',
  },
  orangeButton: {
    backgroundColor: '#FF7043',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closePatrolButton: {
    width:"100%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  closePatrolText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  complaintSummary: {
    width:"100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  complaintSummaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
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

export default VisitDetailsScreen;

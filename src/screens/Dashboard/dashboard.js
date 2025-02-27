import React, { useState } from 'react';
import {StyleSheet, View, TouchableOpacity,Image,Text,ScrollView} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header';
import SummaryTable from '../../components/summaryTable/summaryTable';
import SideModal from '../../components/sideModal/sideModal';

const Dashboard = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const menuItems = [
    {label: ' एप होम', icon: 'home', screen:'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen:"Dashboard"},
    {label: ' मेरी बीट', icon: 'plus-box', screen:"MeriBeat"},
    {label: ' लंबित शिकायत', icon: 'alert-circle', screen:"ComplaintList"},
    {label: ' निस्तारित शिकायत', icon: 'check-circle', screen:"CompletedComplaints"},
    {label: ' सभी शिकायत', icon: 'file-document',screen:'AllComplaints'},
    {label: ' सभी भ्रमण', icon: 'car',screen:"AllVisits"},
    {label: ' आपके भ्रमण', icon: 'walk'},
    {label: ' लॉग आउट', icon: 'logout', screen:'Login'},
  ];
  return (
    <>
              <SideModal isVisible={modalVisible} onClose={() => setModalVisible(false)} navigation={navigation} />
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true) }
          onProfilePress={() => console.log('Profile Pressed')}
        />
        <SummaryTable />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
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

export default Dashboard;

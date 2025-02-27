import React, { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView,Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard';
import SideModal from '../../components/sideModal/sideModal';

// Dummy complaints data
const complaints = [
  {
    id: '1',
    name: 'अनिल कुमार',
    phone: '9292929292',
    issue: 'स्कूल / कॉलेज जाने वाली लड़कियों से छेड़छाड़',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 21, 2021',
  },
  {
    id: '2',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
  {
    id: '3',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
  {
    id: '4',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
];

const ComplaintList = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
    
  const menuItems = [
    {label: ' एप होम', icon: 'home', screen:'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen:"Dashboard"},
    {label: ' मेरी बीट', icon: 'plus-box',screen:"MeriBeat"},
    {label: ' लंबित शिकायत', icon: 'alert-circle',screen:"ComplaintList"},
    {label: ' निस्तारित शिकायत', icon: 'check-circle',screen:"CompletedComplaints"},
    {label: ' सभी शिकायत', icon: 'file-document', screen:"AllComplaints"},
    {label: ' सभी भ्रमण', icon: 'car', screen:"AllVisits"},
    {label: ' आपके भ्रमण', icon: 'walk'},
    {label: ' लॉग आउट', icon: 'logout', screen:'Login'},
  ];
  return (
    <>
      <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <View style={styles.container}>
        {/* Header Component */}
        <Header title="महिला बीट" onMenuPress={() => setModalVisible(true)} />

        {/* Search Bar Section */}
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchText}>जानकारी से खोजें</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.row}>
            <Text style={styles.summaryText}>
              कुल लंबित शिकायत - {complaints.length}
            </Text>
            <Icon name="refresh" size={24} color="green" />
          </View>
          <View style={styles.row}>
            <Icon name="arrow-downward" size={24} color="green" />
            <Icon name="sort-by-alpha" size={24} color="green" />
            <Icon name="info-outline" size={24} color="black" />
          </View>
        </View>

        {/* Complaint List */}
        <FlatList
          style={{gap: 10}}
          data={complaints}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: '3%'}}>
              <ComplaintCard
                name={item.name}
                phone={item.phone}
                category={item.issue}
                address={item.location}
                date={item.date}
                color='#D44624'
              />
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    gap: 5,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#B63A1E',
    padding: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B63A1E',
  },
  complaintCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'green',
  },
  card: {
    backgroundColor: '#D44624',
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardPhone: {
    fontSize: 16,
    color: '#fff',
  },
  cardIssue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#fff',
  },
  cardDate: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
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

export default ComplaintList;

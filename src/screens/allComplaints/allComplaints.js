import React, { useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header'; // Your existing header component
import ComplaintCard from '../../components/complainCard/complaintCard'; // Import ComplaintCard
import SideModal from '../../components/sideModal/sideModal';

// Dummy completed complaints data
const allComplaints = [
  {
    id: '1',
    name: 'yt34',
    phone: '9876543210',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
    status:'completed'
  },
  {
    id: '2',
    name: 'djjxxhjb',
    phone: '7368872399',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
    date: 'Oct 20, 2021',
  },
  {
    id: '3',
    name: 'प्रतिमा',
    phone: '78987498789743984',
    issue: 'महिलाओं से संबंधित अपराध',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
    date: 'Oct 20, 2021',
    status:'completed'
  },
  {
    id: '4',
    name: 'प्रतिमा',
    phone: '78987498789743984',
    issue: 'महिलाओं से संबंधित अपराध',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
    date: 'Oct 20, 2021',
    status:'completed'
  },
  {
    id: '5',
    name: 'djjxxhjb',
    phone: '7368872399',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
    date: 'Oct 20, 2021',
  },
];

const AllComplaints = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
    
  const menuItems = [
    {label: ' एप होम', icon: 'home', screen:'Home',},
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
          <Text style={styles.summaryText}>कुल कार्यवाही पूर्ण शिकायत - {allComplaints.length}</Text>
          <Icon name="refresh" size={24} color="green" />
        </View>
      </View>

      {/* Complaints List */}
      <FlatList
        data={allComplaints}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{flex: 1, paddingHorizontal: '3%'}}>
           { item.status === "completed"?
           ( <ComplaintCard
              name={item.name}
              phone={item.phone}
              category={item.issue}
              address={item.location}
              date={item.date}
              onPress={() => navigation.navigate('AllComplaints')}
              color="#0D92F4"
              status="completed"
            /> ): 
           ( <ComplaintCard
            name={item.name}
            phone={item.phone}
            category={item.issue}
            address={item.location}
            date={item.date}
            onPress={() => navigation.navigate('AllComplaints')}
            color='#D44624'
          />)
            }
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
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal:"2%"
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

export default AllComplaints;

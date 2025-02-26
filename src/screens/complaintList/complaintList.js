import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Using MaterialIcons
import Header from '../../components/header/header'; // Import your existing Header Component
import ComplaintCard from '../../components/complainCard/complaintCard';

// Dummy complaints data
const complaints = [
  {
    id: '1',
    name: 'अनिल कुमार',
    phone: '9292929292',
    issue: 'स्कूल / कॉलेज जाने वाली लड़कियों से छेड़छाड़',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: "Oct 21, 2021",
  },
  {
    id: '2',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: "पति पत्नी / घरेलू विवाद",
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
  {
    id: '3',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: "पति पत्नी / घरेलू विवाद",
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
  {
    id: '4',
    name: 'मोहित कुमार',
    phone: '9292929292',
    issue: "पति पत्नी / घरेलू विवाद",
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
  },
  // Add more complaints here...
];

const ComplaintList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header title="महिला बीट" />

      {/* Search Bar Section */}
      <TouchableOpacity style={styles.searchBar}>
        <Text style={styles.searchText}>जानकारी से खोजें</Text>
        <Icon name="keyboard-arrow-down" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.summaryText}>कुल लंबित शिकायत - {complaints.length}</Text>
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
        style={{gap:10}}
        data={complaints}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={{flex:1,paddingHorizontal:"3%"}}>
            <ComplaintCard
            name={item.name}
            phone={item.phone}
            category={item.issue}
            address={item.location}
            date={item.date}
          />
          </View>
        )}
      />
    </View>
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
});

export default ComplaintList;

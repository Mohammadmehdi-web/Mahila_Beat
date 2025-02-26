import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icons
import Header from '../../components/header/header'; // Your existing header component
import ComplaintCard from '../../components/complainCard/complaintCard'; // Import ComplaintCard

// Dummy completed complaints data
const completedComplaints = [
  {
    id: '1',
    name: 'yt34',
    phone: '9876543210',
    issue: 'पति पत्नी / घरेलू विवाद',
    location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
    date: 'Oct 22, 2021',
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
  },
];

const CompletedComplaints = ({navigation}) => {
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
          <Text style={styles.summaryText}>कुल कार्यवाही पूर्ण शिकायत - {completedComplaints.length}</Text>
          <Icon name="refresh" size={24} color="green" />
        </View>
        <View style={styles.row}>
          <Icon name="arrow-downward" size={24} color="green" />
          <Icon name="sort-by-alpha" size={24} color="green" />
          <Icon name="info-outline" size={24} color="black" />
        </View>
      </View>

      {/* Complaints List */}
      <FlatList
        data={completedComplaints}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{flex: 1, paddingHorizontal: '3%'}}>
            <ComplaintCard
              name={item.name}
              phone={item.phone}
              category={item.issue}
              address={item.location}
              date={item.date}
              color="#0D92F4"
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
});

export default CompletedComplaints;

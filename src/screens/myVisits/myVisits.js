import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/header/header'; // Your existing header component
import VisitCard from '../../components/visitCard/visitCard'; // Import the card component
import SideModal from '../../components/sideModal/sideModal';
import Search from '../../components/search/search';
// import Search from '../../components/search/search';

const complaints = [
  { location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / अछार', officer: 'उ0नि0 श्री देवेंद्र सिंह - 6393292234', distance: '0.0', date: 'Oct 22, 2021',  },
  { location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / अछार', officer: 'प्रभा - 9585555555', distance: '21.0', date: 'Oct 21, 2021' },
  { location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / कुबेरपुर', officer: 'प्रभा - 9585555555', distance: '21.0', date: 'Oct 21, 2021' },
  { location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / कचा एत्मादपुर', officer: 'उ0नि0 श्री देवेंद्र सिंह - 6393292234', distance: '21.0', date: 'Oct 20, 2021' },
];

const MyVisits = ({navigation}) => {
          const [modalVisible, setModalVisible] = useState(false);
    
  return (
    <>
      <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <View>
      <Header title="महिला बीट" onMenuPress={() => setModalVisible(true)} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.section}>
          <Search />
          <View style={styles.statusBar}>
            <Text style={styles.totalCount}>🔵 कुल भ्रमण 10</Text>
            <Icon name="reload" size={20} color="green" />
            <Icon name="arrow-down" size={20} color="green" />
            <Icon name="sort-alphabetical-ascending" size={20} color="green" />
          </View>
        </View>

        {complaints.map((item, index) => (
          <VisitCard key={index} {...item} 
          onPress={() => navigation.navigate('VisitInfo')}  />
        ))}
      </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#d32f2f',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  totalCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MyVisits;

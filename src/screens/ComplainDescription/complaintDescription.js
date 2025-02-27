import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/header/header'; 
import SideModal from '../../components/sideModal/sideModal';

const ComplaintDescription = ({navigation}) => {
  return (
    <>
      <Header title="महिला बीट" />
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CompletedComplaints')}>
            <Icon name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.heading}>शिकायत का विवरण</Text>
        </View>

        <View style={styles.card}>

          <Text style={styles.label}>शिकायतकर्ता का नाम</Text>
          <Text style={styles.highlight}>yt34</Text>

          <Text style={styles.label}>शिकायतकर्ता का मोबाइल नं</Text>
          <Text style={styles.highlight}>9876543210</Text>

          <Text style={styles.label}>शिकायत का प्रकार</Text>
          <Text style={styles.highlight}>पति पत्नी / घरेलू विवाद</Text>

          <Text style={styles.label}>शिकायत का दिनांक व समय</Text>
          <Text style={styles.highlight}>Oct 22 2021  8:22AM</Text>

          <Text style={styles.label}>शिकायत का स्थान</Text>
          <Text style={styles.highlight}>भ्रमण के दौरान</Text>

          <Text style={styles.label}>शिकायत का क्षेत्र</Text>
          <Text style={styles.highlight}>उत्तर प्रदेश / आगरा / एत्मादपुर / अछार</Text>

          <Text style={styles.label}>शिकायत का स्टेटस</Text>
          <Text style={styles.highlight}>पूर्ण</Text>

          <Text style={styles.label}>शिकायत पर कार्यवाही</Text>
          <Text style={styles.highlight}>मोका पर समझौता</Text>

          <Text style={styles.label}>शिकायत पर कार्यवाहीकर्ता</Text>
          <Text style={styles.highlight}>उ0नि0 श्री देवेंद्र सिंह, 9876543210</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    gap:10,
    backgroundColor: '#f8f8f8',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 85,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '5%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems:'center',
    gap:11.5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
});

export default ComplaintDescription;

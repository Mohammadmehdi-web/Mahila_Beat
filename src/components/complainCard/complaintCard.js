import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ComplaintCard = ({name, phone, category, address, date, color}) => {
  return (
    <TouchableOpacity>
      <View style={[styles.card,{backgroundColor:color}]}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.date}>शिकायत दिनांक - {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#D84315',
    padding: '6%',
    borderRadius: 8,
    elevation: 3,
    gap: 10,
    marginTop: '2%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  phone: {
    fontSize: 14,
    color: '#fff',
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  address: {
    fontSize: 12,
    color: '#fff',
  },
  date: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ComplaintCard;

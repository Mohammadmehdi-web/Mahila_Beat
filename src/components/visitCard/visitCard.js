import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const VisitCard = ({id,location, officer, distance, date, onPress}) => {
  return (
    <TouchableOpacity key={id} onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.officer}>{officer}</Text>
        <Text style={styles.distance}>गांव / मोहल्ले से दूरी - {distance}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#795548',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    position: 'relative',
  },
  location: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  officer: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  distance: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  dateContainer: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#673AB7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  date: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default VisitCard;

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ComplaintCard = ({
  id,
  name,
  phone,
  category,
  address,
  date,
  color,
  onPress,
  status,
}) => {
  return (
    <TouchableOpacity key={id} onPress={onPress}>
      <View style={[styles.card, {backgroundColor: color}]}>
        {status === 'completed' ? (
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        ) : (
          <></>
        )}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
        <Text style={styles.category}>{category}</Text>
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
    marginTop: '5%',
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
  dateBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#563D7C',
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    borderRadius: 10,
    elevation: 3,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ComplaintCard;

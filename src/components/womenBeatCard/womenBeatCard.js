import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WomenBeatCard = ({navigation, onPress}) => {
  return (
    <View style={styles.card}>
      {/* Icon and Title */}
      <Icon name="building" size={30} color="white" style={styles.icon} />
      <Text style={styles.title}>महिला बीट</Text>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="plus-circle" size={16} color="#333" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>नया भ्रमण जोड़ें</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#C2185B', // Pink background
    padding: "6%",
    borderRadius: 10,
    width: "50%",
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    gap: 15,
    marginLeft:"3%"
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    paddingVertical: "3%",
    paddingHorizontal: "4%",
    borderRadius: 5,
    gap:5
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
  },
});

export default WomenBeatCard;

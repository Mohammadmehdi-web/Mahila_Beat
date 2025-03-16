import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const WomenInfoCard = ({index, womanData, updateData, errors}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.sectionHeader}>{index + 1}. महिला की जानकारी</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>नाम</Text>
        <Text style={styles.subLabel}>महिला का नाम</Text>
        <TextInput
          style={styles.input}
          value={womanData.name}
          onChangeText={text => updateData(index, 'name', text)}
          placeholder="नाम दर्ज करें"
          placeholderTextColor="#B3B3B3"
        />
        {errors[`name${index + 1}`] && (
          <Text style={styles.errorText}>{errors[`name${index + 1}`]}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>मोबाइल नंबर</Text>
        <Text style={styles.subLabel}>महिला का मोबाइल नंबर</Text>
        <TextInput
          style={styles.input}
          value={womanData.mobileNumber}
          onChangeText={text => updateData(index, 'mobileNumber', text)}
          placeholder="मोबाइल नंबर दर्ज करें"
          keyboardType="numeric"
          placeholderTextColor="#B3B3B3"
        />
        {errors[`mobile${index + 1}`] && (
          <Text style={styles.errorText}>{errors[`mobile${index + 1}`]}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    elevation: 3,
  },
  sectionHeader: {
    backgroundColor: '#E91E63',
    color: 'white',
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  subLabel: {
    fontSize: 12,
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default WomenInfoCard;

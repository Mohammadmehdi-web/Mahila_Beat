import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatusCheck = ({ isChecked, setIsChecked }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsChecked(!isChecked)}
      activeOpacity={0.8}
    >
      <Icon
        name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={24}
        color={isChecked ? '#007BBD' : '#666'}
      />
      <Text style={styles.label}>पूर्ण के रूप में चिह्नित करें</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
});

export default StatusCheck;

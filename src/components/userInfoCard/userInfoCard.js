import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
// import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

const UserInfoCard = ({isVisible, onClose, navigation}) => {
  const userDetails = useSelector(state => state.auth.userDetails);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      propagateSwipe={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="close" size={24} color="black" />
              </TouchableOpacity>

              <Text style={styles.loginId}>LoginId: {userDetails.LoginId}</Text>

              <View style={styles.infoContainer}>
                <Text style={styles.label}>नाम</Text>
                <Text style={styles.value}>30नि0 {userDetails.Name}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>जनपद</Text>
                <Text style={styles.value}>{userDetails.DistrictName}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>थाना</Text>
                <Text style={styles.value}>{userDetails.ThanaName.trim()}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>मोबाइल नं0</Text>
                <Text style={styles.value}>{userDetails.MobileNumber}</Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>पी.एन.ओ.</Text>
                <Text style={styles.value}>{userDetails.PNONumber}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// 🔹 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: '4%',
    alignItems: 'center',
    elevation: 5,
    gap: 8,
  },
  closeButton: {
    position: 'absolute',
    top: '3%',
    left: '4%',
  },
  loginId: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '2%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C2185B',
  },
  value: {
    fontSize: 14,
    color: 'black',
  },
  updateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    borderRadius: 5,
    gap: 5,
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserInfoCard;

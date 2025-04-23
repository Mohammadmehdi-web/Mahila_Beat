import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Logo from '../../assets/policeLogo.png';
import {logout} from '../../redux/slice/authSlice';
import {useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

const SideModal = ({isVisible, onClose, navigation}) => {
  const dispatch = useDispatch();
  const menuItems = [
    {label: ' एप होम', icon: 'home', screen: 'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen: 'Dashboard'},
    {label: ' मेरी बीट', icon: 'plus-box', screen: 'MeriBeat'},
    {label: ' लंबित शिकायत', icon: 'alert-circle', screen: 'ComplaintList'},
    {
      label: ' निस्तारित शिकायत',
      icon: 'check-circle',
      screen: 'CompletedComplaints',
    },
    {label: ' सभी शिकायत', icon: 'file-document', screen: 'AllComplaints'},
    {label: ' सभी भ्रमण', icon: 'car', screen: 'AllVisits'},
    {label: ' आपके भ्रमण', icon: 'walk', screen: 'MyVisits'},
    {label: ' पासवर्ड बदलें', icon: 'onepassword', screen: 'ChangePassword'},
    {label: ' लॉग आउट', icon: 'logout', screen: 'Login'},
  ];

  return (
    <Modal
      visible={isVisible}
      coverScreen
      backdropColor="rgba(0,0,0,0.3)"
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      propagateSwipe={true}
      onRequestClose={onClose}
      style={{margin: 0}}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {/* Header Section with Logo */}
              <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.title}>सोनभद्र पुलिस</Text>
                <Text style={styles.subtitle}>सुरक्षा आपकी संकल्प हमारा</Text>
              </View>

              {/* Menu Items */}
              <ScrollView>
                {menuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.menuItem}
                    onPress={() => {
                      if (item.screen === 'Login') {
                        dispatch(logout());
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{name: 'Login'}],
                          }),
                        );
                      } else {
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [{name: item.screen}],
                          }),
                        );
                        onClose();
                      }
                    }}>
                    <Icon
                      name={item.icon}
                      size={24}
                      color="#C2185B"
                      style={styles.icon}
                    />
                    <Text style={styles.menuText}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Close Button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>बंद करें</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '70%',
    height: '100%',
    backgroundColor: '#FFF',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'flex-start',
    gap: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EFDCAB',
  },
  logo: {
    width: '60%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2185B',
  },
  subtitle: {
    fontSize: 12,
    color: '#C2185B',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    paddingLeft: '6%',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#C2185B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SideModal;

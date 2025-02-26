import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import Logo from '../../assets/policeLogo.png';
import Header from '../../components/header/header';

const DetailsScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState('');

  const menuItems = [
    {label: ' एप होम', icon: 'home', screen: 'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen: 'Dashboard'},
    {label: ' मेरी बीट', icon: 'plus-box', screen: 'MeriBeat'},
    {label: ' लंबित शिकायत', icon: 'alert-circle'},
    {label: ' निस्तारित शिकायत', icon: 'check-circle',screen:"CompletedComplaints"},
    {label: ' सभी शिकायत', icon: 'file-document'},
    {label: ' सभी भ्रमण', icon: 'car'},
    {label: ' आपके भ्रमण', icon: 'walk'},
    {label: ' लॉग आउट', icon: 'logout', screen: 'Login'},
  ];

  return (
    <>
      <Modal
        isVisible={modalVisible}
        coverScreen
        onBackdropPress={() => setModalVisible(false)}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        backdropOpacity={0.5}
        style={{margin: 0}}>
        <View style={styles.modalContent}>
          {/* Header Section with Logo */}
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>आगरा जोन पुलिस</Text>
            <Text style={styles.subtitle}>सुरक्षा आपकी संकल्प हमारा</Text>
          </View>

          {/* Menu Items */}
          <ScrollView>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => navigation.navigate(item.screen)}>
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
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeText}>बंद करें</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => console.log('Profile Pressed')}
        />
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("MeriBeat")}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>भ्रमण का विवरण</Text>
          </View>
          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Women Beat Visit */}
            <TouchableOpacity style={styles.pinkButton}>
              <Text style={styles.buttonText}>महिला बीट पर भ्रमण</Text>
            </TouchableOpacity>

            {/* Date Input */}
            <View style={styles.inputRow}>
              <Text style={styles.label}>भ्रमण का दिनांक</Text>
              <TextInput
                style={styles.input}
                value="23-10-2021"
                editable={false}
              />
            </View>

            {/* Distance Section */}
            <TouchableOpacity style={styles.pinkButton}>
              <Text style={styles.buttonText}>गाँव / मोहल्ला की दूरी</Text>
            </TouchableOpacity>

            {/* Information Section */}
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                भ्रमण की जानकारी गाँव / मोहल्ले के 1 किलोमीटर क्षेत्र के अंतर्गत
                ही सुरक्षित करी जाएगी
              </Text>
            </View>

            {/* Village Selection */}
            <Text style={styles.fieldLabel}>गाँव / मोहल्ले का चयन करें *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedVillage}
                onValueChange={itemValue => setSelectedVillage(itemValue)}>
                <Picker.Item label="गाँव / मोहल्ला" value="" />
                <Picker.Item label="गाँव 1" value="village1" />
                <Picker.Item label="गाँव 2" value="village2" />
              </Picker>
            </View>

            {/* Assistant Selection */}
            <Text style={styles.fieldLabel}>सहकर्मी का चयन करें *</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAssistant}
                onValueChange={itemValue => setSelectedAssistant(itemValue)}>
                <Picker.Item label="सहकर्मी का चयन करें" value="" />
                <Picker.Item label="सहकर्मी 1" value="assistant1" />
                <Picker.Item label="सहकर्मी 2" value="assistant2" />
              </Picker>
            </View>

            {/* Save Information Button */}
            <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('VisitDetails')}>
              <Text style={styles.saveButtonText}>जानकारी सुरक्षित करें</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#F8F8F8',
    padding: '4%',
    gap: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:85
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: '3%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    gap: 28,
  },
  pinkButton: {
    backgroundColor: '#C2185B',
    paddingVertical: '4%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '3%',
    gap: 4,
    borderRadius: 5,
    backgroundColor: '#C2185B',
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
  },
  input: {
    paddingVertical: '4%',
    paddingHorizontal: '4%',
    borderRadius: 5,
    flex: 1,
    textAlign: 'right',
    color: '#ffffff',
  },
  infoBox: {
    backgroundColor: '#C2185B',
    padding: '3%',
    borderRadius: 5,
  },
  infoText: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#C2185B',
    paddingVertical: '5%',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContent: {
    width: '70%',
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

export default DetailsScreen;

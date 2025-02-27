import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';

import Logo from '../../assets/policeLogo.png';
import Header from '../../components/header/header';
import WomenInfoCard from '../../components/womenInfoCard/womenInfoCard';
import SideModal from '../../components/sideModal/sideModal';

const SamvadDetails = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [womenCount, setWomenCount] = useState('');
  const [womenDetails, setWomenDetails] = useState([
    {name: 'premlata', phone: '52369853'},
    {name: 'xyz', phone: '9652368986'},
  ]);
  const [selectedScheme, setSelectedScheme] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [womenData, setWomenData] = useState([
    {name: '', mobileNumber: ''},
    {name: '', mobileNumber: ''},
    {name: '', mobileNumber: ''},
  ]);

  const updateData = (index, field, value) => {
    const newData = [...womenData];
    newData[index][field] = value;
    setWomenData(newData);
  };

  const menuItems = [
    {label: ' एप होम', icon: 'home', screen: 'Home'},
    {label: ' डैशबोर्ड', icon: 'view-dashboard', screen: 'Dashboard'},
    {label: ' मेरी बीट', icon: 'plus-box', screen: 'MeriBeat'},
    {label: ' लंबित शिकायत', icon: 'alert-circle',screen:"CompletedComplaints"},
    {label: ' निस्तारित शिकायत', icon: 'check-circle'},
    {label: ' सभी शिकायत', icon: 'file-document',screen:'AllComplaints'},
    {label: ' सभी भ्रमण', icon: 'car',screen:"AllVisits"},
    {label: ' आपके भ्रमण', icon: 'walk'},
    {label: ' लॉग आउट', icon: 'logout', screen: 'Login'},
  ];

  const handleImagePick = () => {
    // Dummy image selection logic (Replace with ImagePicker)
    setImageUri('https://via.placeholder.com/150');
  };

  return (
    <>
     <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('VisitDetails')}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>संवाद का विवरण</Text>
          </View>
          {/* Date Selection */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateText}>संवाद का दिनांक</Text>
              <Text style={styles.dateValue}>23-10-2021</Text>
            </TouchableOpacity>
          </View>

          {/* Location Selection */}
          <View style={styles.card}>
            <Text style={styles.label}>संवाद के स्थान का चयन करें *</Text>
            <View style={{borderBottomWidth: 1}}>
              <Picker
                selectedValue={selectedLocation}
                onValueChange={itemValue => setSelectedLocation(itemValue)}
                style={{color: 'black'}}
                dropdownIconColor="black">
                <Picker.Item label="मिशन शक्ति कक्ष" value="मिशन शक्ति कक्ष" />
                <Picker.Item label="गाँव पंचायत भवन" value="गाँव पंचायत भवन" />
              </Picker>
            </View>
          </View>

          {/* Number of Women Participating */}
          <View style={styles.card}>
            <Text style={styles.label}>
              संवाद में सम्मिलित महिलाओं की संख्या *
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="संख्या दर्ज करें"
              value={womenCount}
              onChangeText={setWomenCount}
            />
          </View>

          {/* Women Details */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              संवाद में सम्मिलित कुछ महिलाओं की जानकारी
            </Text>
            {womenData.map((item, index) => (
              <WomenInfoCard
                key={index}
                index={index}
                womanData={item}
                updateData={updateData}
              />
            ))}
          </View>

          {/* Scheme Selection */}
          <View style={styles.card}>
            <Text style={styles.label}>
              सरकारी योजनाओं की जानकारी का चयन करें *
            </Text>
            <View style={{borderBottomWidth: 1}}>
              <Picker
                selectedValue={selectedScheme}
                onValueChange={itemValue => setSelectedScheme(itemValue)}
                style={{color: 'black'}}
                dropdownIconColor="black">
                <Picker.Item
                  label="सरकारी योजनाओं की जानकारी"
                  value="default"
                />
                <Picker.Item
                  label="निर्बल महिला पेंशन योजना"
                  value="निर्बल महिला पेंशन योजना"
                />
              </Picker>
            </View>
          </View>

          {/* Image Upload */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>संवाद के स्थान की फोटो</Text>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={handleImagePick}>
              <Icon name="camera" size={30} color="white" />
            </TouchableOpacity>
            {imageUri && (
              <Image source={{uri: imageUri}} style={styles.previewImage} />
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>जानकारी सुरक्षित करें</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9F9'},
  scrollView: {padding: 15},
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
  card: {
    backgroundColor: '#fff',
    padding: '4%',
    borderRadius: 10,
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
  },
  dateText: {color: 'white', fontSize: 16},
  dateValue: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  label: {fontSize: 14, color: '#333', paddingBottom: '3%'},
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: '3%',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
  },
  womanCard: {
    backgroundColor: '#FFC1E3',
    borderRadius: 5,
  },
  womanInfo: {fontSize: 14, color: '#333'},
  imagePicker: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  previewImage: {width: 100, height: 100, borderRadius: 5, marginTop: 10},
  submitButton: {
    backgroundColor: '#E91E63',
    padding: '3%',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: '6%',
  },
  submitButtonText: {color: 'white', fontSize: 16, fontWeight: 'bold'},
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

export default SamvadDetails;

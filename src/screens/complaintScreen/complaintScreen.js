import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from '../../components/header/header'; // Your existing header component

const ComplaintScreen = ({navigation}) => {
  const [date, setDate] = useState('23-10-2021');
  const [complainantName, setComplainantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [problemType, setProblemType] = useState('');
  const [imageUri, setImageUri] = useState(null);

  // Function to handle camera
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      cameraType: 'back',
    };

    launchCamera(options, response => {
      if (!response.didCancel && !response.errorCode) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const openCameraForVideo = () => {
    const options = {
      mediaType: 'video',
      videoQuality: 'high',
      durationLimit: 10, // Now limited to 10 seconds
    };
  
    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        setVideoUri(response.assets[0].uri);
      }
    });
  };
  

  // Function to submit complaint
  const handleSubmit = () => {
    if (!complainantName || !mobileNumber || !problemType) {
      Alert.alert('कृपया सभी आवश्यक फ़ील्ड भरें');
      return;
    }

    const complaintData = {
      date,
      complainantName,
      mobileNumber,
      problemType,
      imageUri,
    };

    console.log('Complaint Data:', complaintData);
    Alert.alert('शिकायत दर्ज', 'आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई।');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Header title="महिला बीट" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('VisitDetails')}>
            <Icon name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.heading}>संवाद का विवरण</Text>
        </View>
        {/* Complaint Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>शिकायत का दिनांक</Text>
          <Text style={styles.dateBox}>{date}</Text>
        </View>

        {/* Name Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>शिकायतकर्ता का नाम</Text>
          <TextInput
            style={styles.input}
            value={complainantName}
            onChangeText={setComplainantName}
            placeholder="नाम दर्ज करें"
          />
        </View>

        {/* Mobile Number Input */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>शिकायतकर्ता का मोबाइल नंबर</Text>
          <TextInput
            style={styles.input}
            value={mobileNumber}
            onChangeText={setMobileNumber}
            placeholder="मोबाइल नंबर दर्ज करें"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>समस्या का प्रकार</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={problemType}
              onValueChange={itemValue => setProblemType(itemValue)}
              style={styles.picker}
              dropdownIconColor="black">
              <Picker.Item label="समस्या का प्रकार चुनें" value="" />
              <Picker.Item
                label="स्कूल / कॉलेज जाने वाली लड़कियों से छेड़छाड़"
                value="Eve teasing"
              />
              <Picker.Item label="घरेलू हिंसा" value="Domestic Violence" />
              <Picker.Item label="अन्य समस्या" value="Other" />
            </Picker>
          </View>
        </View>

        {/* Image Upload Section */}
        <View style={styles.inputSection}>
          <Text style={styles.label}>समस्या / आवेदन का विवरण</Text>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={openCamera}>
            <Text style={styles.buttonText}>📷 फोटो लें</Text>
          </TouchableOpacity>

          {imageUri && (
            <Image source={{uri: imageUri}} style={styles.uploadedImage} />
          )}
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.label}>
            शिकायत पर कार्रवाई से सम्बंधित 10 सेक की वीडियो
          </Text>

          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.videoThumbnail} />
          ) : null}

          <TouchableOpacity
            style={styles.videoUploadButton}
            onPress={openCameraForVideo}>
            <Text style={styles.buttonText}>📹 Video</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>जानकारी सुरक्षित करें</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    gap: 20,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 85,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    backgroundColor: '#ff4081',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 5,
  },
  inputSection: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  picker: {
    height: 50,
    color: 'black',
  },
  imageUploadButton: {
    backgroundColor: '#ff4081',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  
  videoUploadButton: {
    backgroundColor: '#ff4081', // Matching pink color as in your UI
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  
  submitButton: {
    backgroundColor: '#ff4081',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComplaintScreen;

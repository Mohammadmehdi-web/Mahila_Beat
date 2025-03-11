import React, {useEffect, useState} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/header/header';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import {addComplaintDetails} from '../../redux/slice/activitySlice';

const PROBLEM_API = 'http://re.auctech.in/MobileAppApi/GetProblemMasterDetails';
const PROBLEM_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxProblem';
const API_URL = 'http://re.auctech.in/MobileAppApi/AddComplaintMaster';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxComplaint';

const ComplaintScreen = ({navigation}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {UserId} = useSelector(state => state.auth.userDetails);
  const activityId = useSelector(state => state.activity.currentActivityId);
  const {ActivityDate} = route.params || {};
  const [complainantName, setComplainantName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [problemType, setProblemType] = useState(null);
  const [problemList, setProblemList] = useState([]);
  const [complaintStatusList, setComplaintStatusList] = useState([]);
  const [selectedComplain, setSelectedComplain] = useState({
    id: 0,
    name: '',
  });
  const [imageUri, setImageUri] = useState(null);
  const [videoUri, setVideoUri] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

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
      durationLimit: 10,
    };

    launchCamera(options, response => {
      if (!response.didCancel && !response.errorCode) {
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!complainantName || !mobileNumber || !problemType) {
      Alert.alert('कृपया सभी आवश्यक फ़ील्ड भरें');
    } else {
      postComplaintData();
    }
  };

  const getProblemList = async () => {
    const response = await axios.get(PROBLEM_API, {
      headers: {
        Authorization: `Bearer ${PROBLEM_BEARER}`,
      },
    });
    if (response.data.success === true) {
      setProblemList(response.data.data);
    } else {
      Alert.alert('समस्या सूची नहीं मिली');
    }
  };

  const getComplainStatusList = async () => {
    const response = await axios.post(
      'http://re.auctech.in/MobileAppApi/GetComplaintStatusDetails',
      {},
      {
        headers: {
          Authorization: `Bearer ${'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxProblemtdssdted'}`,
        },
      },
    );

    if (response.data.success === true) {
      setComplaintStatusList(response.data.data);
    } else {
      Alert.alert('शिकायत सूची नहीं मिली');
    }
  };

  const postComplaintData = async () => {
    try {
      const formData = new FormData();

      formData.append('ActivityId', Number(activityId));
      formData.append('ComplaintDate', ActivityDate);
      formData.append('ProblemId', Number(problemType));
      formData.append('ComplainantName', complainantName);
      formData.append('ComplaintStatusId', Number(selectedComplain?.id || 0));
      formData.append('ComplainantNumber', mobileNumber);
      formData.append('Status', selectedComplain?.name);
      formData.append('AddedBy', Number(UserId));

      // Append image if available
      if (imageUri) {
        formData.append('ComplainantImage', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'complainant_image.jpg',
        });
      }

      // Append video if available
      if (videoUri) {
        formData.append('ComplainantVideo', {
          uri: videoUri,
          type: 'video/mp4',
          name: 'complainant_video.mp4',
        });
      }


      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success === true) {
        Object.entries(response.data.data[0]).forEach(([key, value]) => {
          console.log(`🔹 ${key}:`, value, `(${typeof value})`);
        });
        Alert.alert('शिकायत दर्ज', 'आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई।');
        console.log(response.data.data);
        dispatch(
          addComplaintDetails({
            activityId,
            complaintData: {...response.data.data[0]},
          }),
        );
        navigation.navigate('VisitDetails');
      } else {
        Alert.alert('फ़ील्ड को फिर से भरने का प्रयास करें');
      }
    } catch (error) {
      console.error('Error posting complaint data:', error);
      Alert.alert('कुछ गलत हो गया, कृपया पुनः प्रयास करें');
    }
  };

  useEffect(() => {
    getProblemList();
    getComplainStatusList();
  }, []);

  return (
    <>
      <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <UserInfoCard
        isVisible={infoVisible}
        onClose={() => setInfoVisible(false)}
        navigation={navigation}
      />
      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VisitDetails')}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>शिकायत निराकरण</Text>
          </View>
          {/* Complaint Date */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>शिकायत का दिनांक</Text>
            <Text style={styles.dateBox}>{ActivityDate}</Text>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>शिकायतकर्ता का नाम</Text>
            <TextInput
              style={styles.input}
              value={complainantName}
              onChangeText={setComplainantName}
              placeholder="नाम दर्ज करें"
              placeholderTextColor="#B3B3B3"
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
              placeholderTextColor="#B3B3B3"
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
                {problemList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.ProblemName}
                    value={item.ProblemId}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.label}>शिकायत की स्थिति</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={problemType}
                onValueChange={itemValue => setSelectedComplain(JSON.parse(itemValue))}
                style={styles.picker}
                dropdownIconColor="black">
                <Picker.Item label="शिकायत की स्थिति चुनें" value="" />
                {complaintStatusList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.ComplaintStatusName}
                    value={JSON.stringify({
                      id: item.ComplaintStatusId,
                      name: item.ComplaintStatusName,
                    })}
                  />
                ))}
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

            {videoUri ? (
              <Image source={{uri: videoUri}} style={styles.videoThumbnail} />
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
    </>
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  submitButton: {
    backgroundColor: '#E91E63',
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

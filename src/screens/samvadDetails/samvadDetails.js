import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {launchCamera} from 'react-native-image-picker';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';

import Header from '../../components/header/header';
import WomenInfoCard from '../../components/womenInfoCard/womenInfoCard';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import {addSamvadDetails} from '../../redux/slice/activitySlice';
import InputModal from '../../components/inputModal/inputModal';

const API_URL = 'http://re.auctech.in/MobileAppApi/AddConversationMaster';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxla';
const GOV_SCH_API =
  'http://re.auctech.in/MobileAppApi/GetGovernmentschemeMasterDetails';
const GOV_SCH_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxlagov';
const UPLOAD_API = 'http://re.auctech.in/Uploade/CommunicationImage';
const ADD_SCH_API =
  'http://re.auctech.in/MobileAppApi/AddGovernmentschemeMaster';
const ADD_SCH_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxComplainthnfhdd';

const SamvadDetails = ({navigation}) => {
  const routes = useRoute();
  const { ActivityDate} = routes.params || {};
  const {UserId} = useSelector(state => state.auth.userDetails);
  const activityId = useSelector(state => state.activity.currentActivityId);
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState('');
  const [womenCount, setWomenCount] = useState('');
  const [schemeList, setSchemeList] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [womenData, setWomenData] = useState([
    {name: '', mobileNumber: ''},
    {name: '', mobileNumber: ''},
    {name: '', mobileNumber: ''},
  ]);
  const [govSchemeName, setGovSchemeName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const handleChange = text => {
    setGovSchemeName(text);
  };

  const handleSubmit = async () => {
    if (govSchemeName.trim()) {
      await addGovScheme();
      setGovSchemeName('');
      setInputVisible(false);
    }
  };

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
  const updateData = (index, field, value) => {
    const newData = [...womenData];
    newData[index][field] = value;
    setWomenData(newData);
  };

  // const uploadFile = async (fileUri, fileType) => {
  //   if (!fileUri) return null;

  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: fileUri,
  //     name: fileUri.split('/').pop(),
  //     type: fileType,
  //   });

  //   try {
  //     const response = await axios.post(UPLOAD_API, formData, {
  //       headers: {'Content-Type': 'multipart/form-data'},
  //     });
  //     if (response.data.success) {
  //       return response.data.fileUrl; // Assume the API returns the file URL
  //     } else {
  //       Alert.alert('फ़ाइल अपलोड विफल');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Upload Error:', error);
  //     Alert.alert('फ़ाइल अपलोड विफल');
  //     return null;
  //   }
  // };

  const handleValidation = () => {
    if (!selectedLocation || !selectedScheme || !womenCount || !womenData) {
      Alert.alert('सभी फ़ील्ड भरें');
    } else postSamvadData();
  };

  const addGovScheme = async () => {
    const response = await axios.post(
      ADD_SCH_API,
      {
        GovernmentschemesId: 1,
        GovernmentschemesName: govSchemeName,
        AddedBy: UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${ADD_SCH_BEARER}`,
        },
      },
    );
    if (response.data.success === true) {
      getGovScheme();
    }
  };
  const getGovScheme = async () => {
    const response = await axios.get(GOV_SCH_API, {
      headers: {
        Authorization: `Bearer ${GOV_SCH_BEARER}`,
      },
    });
    if (response.data.success === true) {
      console.log(response.data.data);
      setSchemeList(response.data.data);
    }
  };

  const postSamvadData = async () => {
    try {
      const formData = new FormData();
  
      formData.append('ActivityId', activityId);
      formData.append('ConversationNumer', womenCount);
      formData.append('OneWomanName', womenData[0].name);
      formData.append('OneWomanNumber', womenData[0].mobileNumber);
      formData.append('TwoWomanName', womenData[1].name);
      formData.append('TwoWomanNumber', womenData[1].mobileNumber);
      formData.append('ThreeWomanName', womenData[2].name);
      formData.append('ThreeWomanNumber', womenData[2].mobileNumber);
      formData.append('GovernmentschemesId', selectedScheme);
      formData.append('AddedBy', UserId);
  
      // Check if the image exists before appending
      if (imageUri) {
        formData.append('Image', {
          uri: imageUri,
          type: 'image/jpeg', // Modify type accordingly
          name: 'photo.jpg',  // File name
        });
      }
  
      const response = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success === true) {
        Alert.alert('आपका संवाद विवरण सहेज लिया गया है');
        console.log(response.data.data[0]);
        
        dispatch(
          addSamvadDetails({
            activityId,
            samvadData: {...response.data.data[0], PlaceName: selectedLocation} ,
          }),
        );
        navigation.navigate('VisitDetails');
      } else {
        Alert.alert('फ़ील्ड को फिर से भरने का प्रयास करें');
      }
    } catch (error) {
      console.error('Error posting Samvad data:', error);
      Alert.alert('कुछ गलत हो गया, कृपया पुनः प्रयास करें');
    }
  };
  
  useEffect(() => {
    getGovScheme();
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
      <InputModal
        isVisible={inputVisible}
        label="Add Gov Scheme"
        placeholderText="Add Gov Scheme"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onClose={() => setInputVisible(false)}
        navigation={navigation}
      />
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VisitDetails')}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>संवाद का विवरण</Text>
          </View>
          {/* Date Selection */}
          <View style={styles.card}>
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateText}>संवाद का दिनांक</Text>
              <Text style={styles.dateValue}>{ActivityDate}</Text>
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
              placeholderTextColor="#B3B3B3"
            />
          </View>

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

          <View style={styles.card}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.label}>
                सरकारी योजनाओं की जानकारी का चयन करें *
              </Text>
              <Icon
                name="plus-circle-outline"
                size={20}
                onPress={() => setInputVisible(true)}
              />
            </View>
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
                {schemeList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.GovernmentschemesName}
                    value={item.GovernmentschemesId}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>संवाद के स्थान की फोटो</Text>
            <TouchableOpacity style={styles.imagePicker} onPress={openCamera}>
              <Icon name="camera" size={30} color="white" />
            </TouchableOpacity>
            {imageUri && (
              <Image source={{uri: imageUri}} style={styles.previewImage} />
            )}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleValidation}>
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
    gap: 85,
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
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SamvadDetails;

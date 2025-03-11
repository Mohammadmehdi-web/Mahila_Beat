import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useDispatch} from 'react-redux';

import Header from '../../components/header/header';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import {createActivity} from '../../redux/slice/activitySlice';
import {formatDate} from '../../utils/commonMethods';
import InputModal from '../../components/inputModal/inputModal';

const ADD_BEAT_API = 'http://re.auctech.in/MobileAppApi/AddBeatAreaMaster';
const ADD_BEAT_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxComplainthnfh';
const API_URL_BEAT = 'http://re.auctech.in/MobileAppApi/GetBeatAreaDetails';
const BEARER_TOKEN_BEAT =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxla';
const API_URL_SAHKARMI =
  'http://re.auctech.in/MobileAppApi/GetSahkarmiMasterDetails';
const BEARER_TOKEN_SAH =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxla';
const API_URL = 'http://re.auctech.in/MobileAppApi/AddActivityMaster';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxla';

const DetailsScreen = ({navigation}) => {
  const {MahilaBeatName, BeatId, ThanaId, UserId, DistrictId, StateId, ZoneId} =
    useSelector(state => state.auth.userDetails);

  const dispatch = useDispatch();

  const [beatArea, setBeatArea] = useState([]);
  const [sahkarmi, setSahkarmi] = useState([]);
  const [beatName, setBeatName] = useState({id:0, name:''});
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedAssistant, setSelectedAssistant] = useState({
    id: '',
    value: '',
  });
  const [activityDetails, setActivityDetails] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);

  const date = new Date().toLocaleDateString();

  const handleChange = text => {
    setBeatName(text);
  };

  const handleSubmit = async () => {
    if (beatName.trim()) {
      await addBeatArea();
      setBeatName('');
      setInputVisible(false);
    }
  };

  const addBeatArea = async () => {
    const response = await axios.post(
      ADD_BEAT_API,
      {
        StateId: StateId,
        ZoneId: ZoneId,
        DistrictId: DistrictId,
        ThanaId: ThanaId,
        MahilaBeatId: BeatId,
        BeatAreaName: beatName,
        AddedBy: UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${ADD_BEAT_BEARER}`,
        },
      },
    );
    if (response.data.success) {
      alert('Beat area added successfully!');
      setBeatName(''); // Clear input
      getBeatList(); // Refresh the beat list
    } else {
      alert('Failed to add beat area. Please try again.');
    }
  };

  const getBeatList = async () => {
    const response = await axios.post(
      API_URL_BEAT,
      {
        BeatId,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN_BEAT}`,
        },
      },
    );
    if (response.data.success === true) {
      console.log(response.data.data);
      
      setBeatArea(response.data.data);
    }
  };

  const getSahkarmiList = async () => {
    const response = await axios.post(
      API_URL_SAHKARMI,
      {
        ThanaId,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN_SAH}`,
        },
      },
    );
    if (response.data.success === true) {
      // console.log(response.data.data)
      setSahkarmi(response.data.data);
    }
  };

  const addActivityDetails = async () => {
    const response = await axios.post(
      API_URL,
      {
        ActivityDate: date,
        DistanceActivity: '123.5 km',
        BeatAreaName: selectedVillage?.name,
        SahkramiId: selectedAssistant?.id,
        SahkarmiName:selectedAssistant?.name,
        AreaId: selectedVillage?.id,
        AddedBy: UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    if (response.data.success === true) {
      console.log(response.data.data);
      setActivityDetails(response.data.data);
      dispatch(
        createActivity({
          activityId: response.data.data[0].ActivityId,
          bhramadDetails: {
            ActivityId: response.data.data[0].ActivityId,
            ActivityDate: date,
            DistanceActivity: '123.5 km',
            BeatAreaName: selectedVillage?.name,
            BeatAreaId:selectedVillage?.id,
            SahkramiId: selectedAssistant?.id,
            SahkarmiName: selectedAssistant?.name,
            AreaId: BeatId,
            AddedBy: UserId,
          },
        }),
      );
      navigation.navigate('VisitDetails');
    }
  };
  useEffect(() => {
    getBeatList();
    getSahkarmiList();
  }, []);
console.log(selectedVillage);

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
        label="Add Beat Name"
        placeholderText="Add beat Area"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        onClose={() => setInputVisible(false)}
        navigation={navigation}
      />
      <View>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />
        <View style={styles.container}>
          {/* Title */}
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('MeriBeat')}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>भ्रमण का विवरण</Text>
          </View>
          {/* Form Container */}
          <View style={styles.formContainer}>
            {/* Women Beat Visit */}
            <TouchableOpacity style={styles.pinkButton}>
              <Text style={styles.buttonText}>{MahilaBeatName} पर भ्रमण</Text>
            </TouchableOpacity>

            <View style={styles.inputRow}>
              <Text style={styles.label}>भ्रमण का दिनांक</Text>
              <TextInput
                style={styles.input}
                value={formatDate(date)}
                editable={false}
              />
            </View>

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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.fieldLabel}>
                गाँव / मोहल्ले का चयन करें *
              </Text>
              <Icon
                name="plus-circle-outline"
                size={20}
                onPress={() => setInputVisible(true)}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                style={{color:'black'}}
                selectedValue={selectedVillage}
                onValueChange={itemValue => setSelectedVillage(JSON.parse(itemValue))}
                dropdownIconColor="black"
                >
                <Picker.Item style={{fontSize: 18}} label="गाँव / मोहल्ला" value="" />

                {beatArea.map(item => (
                  <Picker.Item
                    label={item.BeatAreaName}
                    value={JSON.stringify({id: item.BeatAreaId,name:item.BeatAreaName})}
                  />
                ))}
              </Picker>
            </View>

            {/* Assistant Selection */}
            <Text style={styles.fieldLabel}>सहकर्मी का चयन करें *</Text>
            <View style={styles.pickerContainer}>
              <Picker 
                style={{color:'black'}}
                selectedValue={selectedAssistant}
                onValueChange={itemValue =>
                  setSelectedAssistant(JSON.parse(itemValue))
                }
                dropdownIconColor="black"
                >
                <Picker.Item style={{fontSize: 18}} label="सहकर्मी का चयन करें" value="" />
                {sahkarmi.map(item => (
                  <Picker.Item
                    label={item.SahkarmiName}
                    value={JSON.stringify({
                      id: item.SahkarmiId,
                      name: item.SahkarmiName,
                    })}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={addActivityDetails}>
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
    gap: 85,
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
    paddingVertical: '5%',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigationState, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

import Header from '../../components/header/header';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import ComplaintVideo from '../../components/complaintVideo/complaintVideo';

import DummyImg from '../../assets/dummyimg.jpg';

const STATUS_API = 'http://re.auctech.in/MobileAppApi/UpdateComplaintMaster';
const STATUS_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+updatecomlaintssdd';

const ComplaintDescription = ({navigation}) => {
  const route = useRoute();
  const {UserId} = useSelector(state => state.auth.userDetails);
  const {complaint} = route.params || {};
  const {PoliceName, MobileNumber} = useSelector(
    state => state.auth.userDetails,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [complaintStatusList, setComplaintStatusList] = useState([]);
  const [complaintData, setComplaintData] = useState({
    complainantName: complaint?.ComplainantName || '',
    complainantNumber: complaint?.ComplainantNumber || '',
    problemType: complaint?.ProblemName || '',
    complaintDate: complaint?.ComplaintDate || '',
    complaintArea: complaint?.BeatAreaName || '',
    complaintStatus: complaint?.ComplaintStatusName || 'Pending',
    policeName: complaint?.PoliceName || '',
    policeId: complaint?.PoliceId || '',
  });

  const [selectedComplain, setSelectedComplain] = useState({
    id: complaint.ComplaintStatusId,
    name: complaint.ComplaintStatusName,
  });

  const previousScreen = useNavigationState(
    state => state.routes[state.index - 1]?.name,
  );

  const handleBackPress = () => {
    navigation.navigate(previousScreen);
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

  const handleSave = async () => {
    try {
      const dataToSend = {
        ActivityId: complaint.ActivityId, // Complaint Activity ID
        ProblemId: complaint.ProblemId || 1, // If ProblemId is not available, assume default value of 1
        ComplaintDate: complaintData.complaintDate, // Date of the complaint
        ComplainantName: complaintData.complainantName, // Complainant's name
        ComplainantNumber: complaintData.complainantNumber, // Complainant's mobile number
        ComplaintStatusId: selectedComplain.id, // The ID of the selected complaint status
        ComplainantImage: complaint.ComplainantImage || '', // Complainant's image URL (if any)
        ComplainantVideo: complaint.ComplainantVideo || '', // Complainant's video URL (if any)
        UpdatedBy: UserId,
        ComplaintId: complaint.ComplaintId,
      };

      // Send data to API
      const response = await axios.post(STATUS_API, dataToSend, {
        headers: {
          Authorization: `Bearer ${STATUS_BEARER}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response.data.data);

      if (response.data.success === true) {
        Alert.alert('Complaint updated successfully');
        handleBackPress();
        setUpdateModalVisible(false);
      } else {
        Alert.alert(`Error: 'Failed to update complaint'}`);
      }
    } catch (error) {
      console.error('Error uploading complaint data:', error);
      Alert.alert('Failed to update complaint. Please try again later.');
    }
  };

  useEffect(() => {
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
      <StatusBar/>
      <Header
        title="महिला बीट"
        onMenuPress={() => setModalVisible(true)}
        onProfilePress={() => setInfoVisible(true)}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.heading}>शिकायत का विवरण</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>शिकायतकर्ता का नाम</Text>
          <Text style={styles.highlight}>
            {complaint?.ComplainantName || 'N/A'}
          </Text>

          <Text style={styles.label}>शिकायतकर्ता का मोबाइल नं</Text>
          <Text style={styles.highlight}>
            {complaint?.ComplainantNumber || 'N/A'}
          </Text>

          <Text style={styles.label}>शिकायत का प्रकार</Text>
          <Text style={styles.highlight}>
            {complaint?.ProblemName || 'Unknown'}
          </Text>
          {complaint.ComplainantImage ? (
            <View
              style={{
                width: '100%',
                flex: 1,
                alignItems: 'center',
              }}>
              <Text style={styles.label}>शिकायत के समय ली गई छवि</Text>
              <Image
                source={
                  complaint.ComplainantImage
                    ? {uri: complaint?.ComplainantImage}
                    : DummyImg
                }
                style={styles.image}
              />
            </View>
          ) : (
            <></>
          )}
          {complaint.ComplainantVideo ? (
            <View style={{flex: 1}}>
              <ComplaintVideo videoUrl={complaint.ComplainantVideo} />
            </View>
          ) : (
            <></>
          )}
          <Text style={styles.label}>शिकायत का दिनांक व समय</Text>
          <Text style={styles.highlight}>{complaint?.ComplaintDate}</Text>

          <Text style={styles.label}>शिकायत का स्थान</Text>
          <Text style={styles.highlight}>भ्रमण के दौरान</Text>

          <Text style={styles.label}>शिकायत का क्षेत्र</Text>
          <Text style={styles.highlight}>
            {complaint?.BeatAreaName || 'N/A'}
          </Text>

          <Text style={styles.label}>शिकायत का स्टेटस</Text>
          <Text style={styles.highlight}>
            {selectedComplain.name || 'Not Available'}
          </Text>

          <Text style={styles.label}>शिकायत पर कार्यवाही</Text>
          <Text style={styles.highlight}>मोका पर समझौता</Text>

          <Text style={styles.label}>शिकायत पर कार्यवाहीकर्ता</Text>
          <Text style={styles.highlight}>
            उ0नि0 {PoliceName} {MobileNumber} {'\n'}
            {complaint.PoliceName ? (
              `उ0नि0 ${complaint.PoliceName} ${complaint.PoliceId}`
            ) : (
              <></>
            )}
          </Text>
        </View>
        {complaint.ComplaintStatusName !== 'Complete' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUpdateModalVisible(true)}>
            <Text style={styles.buttonText}>शिकायत की स्थिति बदलें</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>शिकायत का विवरण संपादित करें</Text>

            <TextInput
              style={styles.input}
              value={complaintData.complainantName}
              onChangeText={text =>
                setComplaintData({...complaintData, complainantName: text})
              }
              placeholder="शिकायतकर्ता का नाम"
            />
            <TextInput
              style={styles.input}
              value={complaintData.complainantNumber}
              onChangeText={text =>
                setComplaintData({...complaintData, complainantNumber: text})
              }
              placeholder="शिकायतकर्ता का मोबाइल नं"
            />
            <TextInput
              style={styles.input}
              value={complaintData.problemType}
              onChangeText={text =>
                setComplaintData({...complaintData, problemType: text})
              }
              placeholder="शिकायत का प्रकार"
            />
            <TextInput
              style={styles.input}
              value={complaintData.complaintDate}
              onChangeText={text =>
                setComplaintData({...complaintData, complaintDate: text})
              }
              placeholder="शिकायत का दिनांक व समय"
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedComplain}
                onValueChange={itemValue => {
                  setSelectedComplain(JSON.parse(itemValue));
                }}
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: '#ccc'}]}
                onPress={() => setUpdateModalVisible(false)}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '4%',
    gap: 10,
    backgroundColor: '#f8f8f8',
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: '5%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    alignItems: 'center',
    gap: 11.5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  highlight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    paddingHorizontal: '2%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 10,
    elevation: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  picker: {
    height: 60,
    color: 'black',
  },
  button: {
    backgroundColor: '#d32f2f',
    padding: '4%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ComplaintDescription;

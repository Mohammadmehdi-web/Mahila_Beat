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
import StatusCheck from '../../components/statusCheck/statusCheck';
import Divider from '../../components/divider/divider';
import {BASE_URL} from '@env';

const COMPLAINT_STATUS_API = `${BASE_URL}/MobileAppApi/GetComplaintStatusDetails`;
const COMPLAINT_STATUS_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxProblemtdssdted';
const STATUS_API = `${BASE_URL}/MobileAppApi/UpdateComplaintMaster`;
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

  const [isChecked, setIsChecked] = useState(false);
  const [finalCheck, setFinalCheck] = useState('no');
  const [remark, setRemark] = useState('');
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
    FinalDisposal: isChecked ? 'Yes' : 'No',
    FinalRemark: remark ? remark : 'इस शिकायत पर कोई टिप्पणी नहीं',
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
      COMPLAINT_STATUS_API,
      {},
      {
        headers: {
          Authorization: `Bearer ${COMPLAINT_STATUS_TOKEN}`,
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
      const formattedDate = dateString => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`; // Converts to YYYY-MM-DD
      };

      const formattedComplaintDate = formattedDate(complaintData.complaintDate);
      const dataToSend = new FormData();

      dataToSend.append('ActivityId', parseInt(complaint.ActivityId));
      dataToSend.append('ProblemId', parseInt(complaint.ProblemId) || 1);
      dataToSend.append('ComplaintDate', formattedComplaintDate);
      dataToSend.append('ComplainantName', complaintData.complainantName);
      dataToSend.append('ComplainantNumber', complaintData.complainantNumber);
      dataToSend.append('ComplaintStatusId', parseInt(selectedComplain.id));
      dataToSend.append('UpdatedBy', parseInt(UserId));
      dataToSend.append('ComplaintId', parseInt(complaint.ComplaintId));

      // Ensure correct value is sent
      console.log('Final Disposal before sending:', isChecked ? 'Yes' : 'No');

      dataToSend.append('FinalDisposal', isChecked ? 'Yes' : 'No');
      dataToSend.append(
        'FinalRemark',
        isChecked && remark ? remark : 'इस शिकायत पर कोई टिप्पणी नहीं',
      );

      console.log('Sending Data:', dataToSend);

      const response = await axios.post(STATUS_API, dataToSend, {
        headers: {
          Authorization: `Bearer ${STATUS_BEARER}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        Alert.alert('शिकायत सफलतापूर्वक अपडेट की गई');
        setUpdateModalVisible(false);
        navigation.goBack();
      } else {
        Alert.alert('शिकायत अपडेट करने में असफल रहा');
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      Alert.alert('शिकायत अपडेट करने में असफल। कृपया पुन: प्रयास करें।');
    }
  };

  useEffect(() => {
    if (!updateModalVisible) {
      getComplainStatusList(); // Refresh status list after update
    }
  }, [updateModalVisible]);

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
      <StatusBar />
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
        {complaint.FinalDisposal !== 'Yes' && (
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
              value={
                complaintData.complaintDate
                //     ? new Date(
                //     parseInt(complaintData.complaintDate.match(/\d+/)[0]),
                //   ).toLocaleDateString()
                // : 'N/A'
              }
              onChangeText={text =>
                setComplaintData({...complaintData, complaintDate: text})
              }
              placeholder="शिकायत का दिनांक व समय"
              editable={false}
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
            <Divider />
            <View>
              <Text style={{fontWeight: 'bold'}}>
                इस शिकायत को पूर्ण के रूप में चिह्नित करें
              </Text>
              <StatusCheck
                isChecked={isChecked}
                setIsChecked={value => {
                  console.log('Checkbox Toggled:', value);
                  setIsChecked(value);
                }}
              />
            </View>

            {isChecked && (
              <TextInput
                style={styles.input}
                placeholder="अपनी टिप्पणी लिखें..."
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                value={complaintData.remark}
                onChangeText={setRemark}
              />
            )}
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
    color: '#000',
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

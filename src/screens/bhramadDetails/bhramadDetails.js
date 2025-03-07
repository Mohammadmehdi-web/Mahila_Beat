import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Header from '../../components/header/header';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import DummyImg from '../../assets/dummyimg.jpg';
import Divider from '../../components/divider/divider';
import axios from 'axios';

const SAMVAD_API =
  'http://re.auctech.in/MobileAppApi/getTotalConversationMaster';
const SAMVAD_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxtotalConversation';
const SIKAYAT_API =
  'http://re.auctech.in/MobileAppApi/GetActivityComplaintMasterDetails';
const SIKAYAT_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxProblemtsd';
const BhramadDetails = ({navigation}) => {
  const activityId = useSelector(state => state.activity.currentActivityId);
  const activityData = useSelector(
    state => state.activity.activities[activityId],
  );

  const {MahilaBeatName, StateName, DistrictName, ThanaName} = useSelector(
    state => state.auth.userDetails,
  );
  const details = activityData.bhramadDetails;
  const samvadData = activityData.samvadDetails[0];
  const complaintData = activityData.complaints[0];
  console.log(samvadData);
  console.log(complaintData);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [mahilaDetails, setMahilaDetails] = useState([]);
    useEffect(() => {
      if (samvadData) {
        setMahilaDetails([
          { id: 1, name: samvadData.OneWomanName || 'N/A', phn: samvadData.OneWomanNumber || 'N/A' },
          { id: 2, name: samvadData.TwoWomanName || 'N/A', phn: samvadData.TwoWomanNumber || 'N/A' },
          { id: 3, name: samvadData.ThreeWomanName || 'N/A', phn: samvadData.ThreeWomanNumber || 'N/A' },
        ]);
      }
    }, [samvadData]);


  // const getSamvadDetails = async () => {
  //   const response = await axios.post(
  //     SAMVAD_API,
  //     {
  //       ActivityId: acti,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${SAMVAD_BEARER}`,
  //       },
  //     },
  //   );
  //   if (response.data.success === true) {
  //     setSamvadDetails(response.data.data);
  //   }
  // };

  // const getComplaintDetails = async () => {
  //   const response = await axios.post(
  //     SIKAYAT_API,
  //     {
  //       ActivityId: 1,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${SIKAYAT_BEARER}`,
  //       },
  //     },
  //   );

  //   if (response.data.success === true) {
  //     setComplainantDetails(response.data.data[0]);
  //     console.log(response.data.data[0]);
  //   }
  // };

  // useEffect(() => {
  //   getSamvadDetails();
  //   getComplaintDetails();
  // }, []);

  // useEffect(() => {
  //   if (samvadData.length > 0) {
  //     setMahilaDetails([
  //       {
  //         id: 1,
  //         name: samvadData.OneWomanName || 'N/A',
  //         phn: samvadData.OneWomanNumber || 'N/A',
  //       },
  //       {
  //         id: 2,
  //         name: samvadData.TwoWomanName || 'N/A',
  //         phn: samvadData.TwoWomanNumber || 'N/A',
  //       },
  //       {
  //         id: 3,
  //         name: samvadData.ThreeWomanName || 'N/A',
  //         phn: samvadData.ThreeWomanNumber || 'N/A',
  //       },
  //     ]);
  //   }
  //   console.log(mahilaDetails);
  // }, [samvadData]);

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
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.headingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VisitDetails')}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>संवाद का विवरण</Text>
          </View>
          {/* Information Card */}
          <View style={styles.card}>
            <Text style={styles.label}>बीट का नाम</Text>
            <Text style={styles.value}>{MahilaBeatName}</Text>

            <Text style={styles.label}>क्षेत्र का नाम</Text>
            <Text style={styles.value}>
             {`${StateName}/${DistrictName}/${ThanaName.trim()}`}
            </Text>

            <Text style={styles.label}>भरण में सहयोगी का नाम</Text>
            <Text style={styles.value}>
             {`कां0 ${details.SahkramiId} ${details.SahkarmiName}`}
            </Text>

            <Text style={styles.label}>भरण का दिनांक व समय</Text>
            <Text style={styles.value}>{details.ActivityDate}</Text>

            <Text style={styles.label}>गाँव / मोहल्ले से दूरी</Text>
            <Text style={styles.value}>{details.DistanceActivity} मीटर </Text>
          </View>

          {complaintData.Image ? (
        <Image
          source={{ uri: complaintData.Image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
          resizeMode="contain"
        />
      ) : (
        <Text>कोई छवि उपलब्ध नहीं है</Text>
      )}

          {/* Pink Button */}
          <View style={styles.pinkButton}>
            <Text style={styles.buttonText}>संवाद का विवरण</Text>
          </View>

          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.accordionText}>मिशन शक्तिक कक्ष</Text>
            <MaterialIcon
              name={
                isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
              }
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          {isDropdownOpen && (
            <View style={styles.dropdownContent}>
              <View style={{gap: 10}}>
                <View style={styles.pinkButton}>
                  <Text style={styles.buttonText}>
                    संदर्भ में सम्मिलित किन्ही तीन महिलाओं की जानकारी
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.label}>संवाद का स्थान</Text>
                  <Text style={styles.value}>{samvadData.PlaceName}</Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: '#ccc',
                    marginVertical: 10,
                  }}
                />
                <View style={styles.bottomTextContainer}>
                  <Text style={[styles.label, {fontSize: 16}]}>
                    सम्वाद म समिलित महिलाओं की संख्या
                  </Text>
                  <Text style={styles.value}>
                    {samvadData.ConversationNumer}
                  </Text>
                </View>

                {mahilaDetails.map(item => (
                  <View key={item.id} style={{gap: 5}}>
                    <View key={item.id} style={styles.pinkButtonSmall}>
                      <Text style={styles.buttonText}>
                        {item.id}. महिला की जानकारी
                      </Text>
                    </View>
                    <View>
                      <View style={styles.nameContainer}>
                        <Text style={styles.label}>नाम</Text>
                        <Text style={styles.value}>{item.name}</Text>
                      </View>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: '#ccc',
                          marginVertical: 10,
                        }}
                      />
                      <View style={styles.nameContainer}>
                        <Text style={styles.label}>मोबाइल नं</Text>
                        <Text style={styles.value}>{item.phn}</Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View style={styles.bottomHeadSection} />
                <View
                  style={[
                    styles.bottomTextContainer,
                    {flexDirection: 'column'},
                  ]}>
                  <Text style={styles.label}>सरकारी योजनाओं की जानकारी</Text>
                  <Text style={styles.value}>प्रधानमंत्री उज्ज्वला योजना</Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.pinkButton}>
            <Text style={styles.buttonText}>शिकायत का विवरण</Text>
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.label}>शिकायतकर्ता का नाम:</Text>
              <Text style={styles.value}>{complaintData.ComplainantName}</Text>
            </View>
            <Divider />
            <View style={styles.nameContainer}>
              <Text style={styles.label}>मोबाइल नंबर</Text>
              <Text style={styles.value}>
                {complaintData.ComplainantNumber}
              </Text>
            </View>
            <Divider />
            <View style={styles.nameContainer}>
              <Text style={styles.label}>स्थिति:</Text>
              <Text style={styles.value}>
                {complaintData.ComplaintStatusId}
              </Text>
            </View>
            <Divider />
            <View style={styles.nameContainer}>
              <Text style={styles.label}>वीडियो:</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(complaintData.ComplainantVideo)}>
                <Text style={{color: 'blue'}}>वीडियो देखें</Text>
              </TouchableOpacity>
            </View>
            <Divider />
            <View style={styles.nameContainer}>
              <Text style={styles.label}>छवि:</Text>
              <Image
                source={
                  complaintData.ComplainantImage
                    ? complaintData.ComplainantImage
                    : DummyImg
                }
                style={styles.image}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.accordion}>
            <Text style={styles.accordionText}>
              {complaintData.ProblemId}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  content: {
    padding: 16,
    gap: 15,
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
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    gap: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 17,
    color: '#C2185B',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  pinkButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  pinkButtonSmall: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomHeadSection: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordion: {
    backgroundColor: '#795548',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  accordionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContent: {
    padding: '4%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    gap: 10,
  },
});

export default BhramadDetails;

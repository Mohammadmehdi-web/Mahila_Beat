import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigationState, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Header from '../../components/header/header';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import ComplaintVideo from '../../components/complaintVideo/complaintVideo';

import DummyImg from '../../assets/dummyimg.jpg';

const ComplaintDescription = ({navigation}) => {
  const route = useRoute();
  const {complaint} = route.params || {};
  const {PoliceName, MobileNumber} = useSelector(
    state => state.auth.userDetails,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const previousScreen = useNavigationState(
    state => state.routes[state.index - 1]?.name,
  );

  const handleBackPress = () => {
    navigation.navigate(previousScreen);
  };

  console.log(complaint);

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
            {complaint?.ComplaintStatusName || 'Not Available'}
          </Text>

          <Text style={styles.label}>शिकायत पर कार्यवाही</Text>
          <Text style={styles.highlight}>मोका पर समझौता</Text>

          <Text style={styles.label}>शिकायत पर कार्यवाहीकर्ता</Text>
          <Text style={styles.highlight}>
            उ0नि0 {PoliceName} {MobileNumber} {'\n'}
           {complaint.PoliceName? `उ0नि0 ${complaint.PoliceName} ${complaint.PoliceId}` : <></>}
          </Text>
        </View>
      </ScrollView>
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
});

export default ComplaintDescription;

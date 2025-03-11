import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SideModal from '../../components/sideModal/sideModal';
import Header from '../../components/header/header';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import {useNavigationState, useRoute} from '@react-navigation/native';

const VisitInfo = ({navigation}) => {
  const route = useRoute();
  const {visitInfo} = route.params || {}

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const previousScreen = useNavigationState(
    state => state.routes[state.index - 1]?.name,
  );

  console.log(visitInfo);
  const mahilaDetails=[
    {id:1, name: visitInfo.OneWomanName, phn:visitInfo.OneWomanNumber},
    {id:2, name: visitInfo.TwoWomanName, phn:visitInfo.TwoWomanNumber},
    {id:3, name: visitInfo.ThreeWomanName, phn:visitInfo.ThreeWomanNumber},
 ]

  const handleBackPress = () => {
    navigation.navigate(previousScreen);
  };
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

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingContainer}>
            <TouchableOpacity onPress={handleBackPress}>
              <Icon name="arrow-left" size={20} />
            </TouchableOpacity>
            <Text style={styles.heading}>भ्रमण की जानकारी</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>बीट का नाम</Text>
            <Text style={[styles.value, styles.highlight]}>
              {visitInfo?.MahilaBeatName}/{visitInfo?.BeatAreaName}
            </Text>

            <Text style={styles.label}>क्षेत्र का नाम</Text>
            <Text style={[styles.value, styles.highlight]}>
              {`${visitInfo?.StateName}/${visitInfo?.DistrictName}/${visitInfo?.ThanaName}`}
            </Text>

            <Text style={styles.label}>भ्रमण में सहकर्मी का नाम</Text>
            <Text style={[styles.value, styles.highlight]}>
              {` कांस्टेबल ${visitInfo.PoliceId} ${visitInfo.PoliceName} - ${visitInfo.MobileNumber}`}
            </Text>

            <Text style={styles.label}>भ्रमण का दिनांक व समय</Text>
            <Text style={[styles.value, styles.date]}>
              {visitInfo?.ActivityDate}
            </Text>

            <Text style={styles.label}>गांव / मोहल्ले से दूरी</Text>
            <Text style={[styles.value, styles.highlight]}>
              {visitInfo?.DistanceActivity}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
            <Text style={styles.buttonText}>संवत का विवरण</Text>
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
                    height: 1,
                    backgroundColor: '#ccc',
                    marginVertical: 10,
                  }}
                />
                <View style={styles.bottomTextContainer}>
                  <Text style={[styles.label, {fontSize: 16}]}>
                    सम्वाद म समिलित महिलाओं की संख्या
                  </Text>
                  <Text style={[styles.value, styles.highlight]}>
                    {visitInfo.ConversationNumer}
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
                        <Text style={[styles.value, styles.highlight]}>{item.name}</Text>
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
                        <Text style={[styles.value, styles.highlight]}>{item.phn}</Text>
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
                  <Text style={[styles.value, styles.highlight]}>प्रधानमंत्री उज्ज्वला योजना</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>शिकायत का विवरण</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    alignItems: 'center',
    padding: 16,
    gap: 15,
  },
  headingContainer: {
    width: '100%',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  highlight: {
    color: '#E91E63', // Pink color for important text
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    color: '#E91E63',
    fontWeight: 'bold',
  },
  button: {
    width: '90%',
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownContent: {
    padding: '4%',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
    gap: 10,
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
});

export default VisitInfo;

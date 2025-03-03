import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const VisitDetailsScreen = ({navigation}) => {
  const {MahilaBeatName} = useSelector(state => state.auth.userDetails)
  const route = useRoute()
  const details = route.params?.details?.[0] || {}
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  console.log(details)

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

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Patrolling Details Section */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>
              वर्तमान भ्रमण की जानकारी / कार्यवाही
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.label}>बीट का नाम</Text>
              <Text style={styles.dateText}>{MahilaBeatName}</Text>

              <Text style={styles.label}>गांव / मोहल्ला का नाम</Text>
              <Text style={styles.dateText}>{details?.BeatAreaName}</Text>

              <Text style={styles.label}>भ्रमण में सहकर्मी का नाम</Text>
              <Text style={styles.redText}>
                {`कां0 ${details.SahkramiId} ${details.SahkramiName}`}
              </Text>

              <Text style={styles.label}>भ्रमण का दिनांक व समय</Text>
              <Text style={styles.dateText}>{details.ActivityDate}</Text>

              <Text style={styles.label}>गांव / मोहल्ला की लोकेशन से दूरी</Text>
              <Text style={styles.dateText}>{details?.DistanceActivity} मीटर</Text>
            </View>

            <View style={styles.actionContainer}>
              <Text style={styles.actionTitle}>भ्रमण की कार्यवाही</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.purpleButton]}
                  onPress={() => navigation.navigate('SamvadDetails',{ActivityId: details.ActivityId})}>
                  <Text style={styles.buttonText}>संवाद / जागरूकता</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.purpleButton]}
                  onPress={() => navigation.navigate('ComplaintScreen')}>
                  <Text style={styles.buttonText}>शिकायत निराकरण</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.orangeButton]}
                onPress={() => navigation.navigate('BhramadDetails')}>
                <Text style={styles.buttonText}>भ्रमण की जानकारी</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closePatrolButton}
              onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="close-circle" size={18} color="#fff" />
              <Text style={styles.closePatrolText}>भ्रमण को बन्द करें</Text>
            </TouchableOpacity>

            <View style={styles.complaintSummary}>
              <Text style={styles.complaintSummaryText}>
                ✅ कुल लंबित शिकायत 1
              </Text>
              <Icon name="refresh" size={18} color="green" />
            </View>

            <View style={{width: '100%'}}>
              <ComplaintCard
                name="मोहित कुमार"
                phone="798739749375"
                category="पति पत्नी / घरेलू विवाद"
                address="उत्तर प्रदेश / आगरा / एसएनपुर / अमर कालोनी"
                date="Oct 21, 2021"
                color="#D44624"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 10,
  },

  detailsContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 3,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#FFF',
    padding: '5%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  redText: {
    fontSize: 18,
    color: '#C2185B',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#C2185B',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionContainer: {
    alignItems: 'center',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  button: {
    width: '40%',
    height: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleButton: {
    backgroundColor: '#8E24AA',
  },
  orangeButton: {
    backgroundColor: '#FF7043',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closePatrolButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  closePatrolText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  complaintSummary: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    justifyContent: 'space-between',
  },
  complaintSummaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default VisitDetailsScreen;

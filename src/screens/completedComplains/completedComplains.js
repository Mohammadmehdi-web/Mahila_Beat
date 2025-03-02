import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';

const API_URL = 'http://re.auctech.in/MobileAppApi/GetReleasedComplaintDetails';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxReleasedComplaintdssdted';

// const completedComplaints = [
//   {
//     id: '1',
//     name: 'yt34',
//     phone: '9876543210',
//     issue: 'पति पत्नी / घरेलू विवाद',
//     location: 'उत्तर प्रदेश / आगरा / एतमादपुर / आगरा',
//     date: 'Oct 22, 2021',
//   },
//   {
//     id: '2',
//     name: 'djjxxhjb',
//     phone: '7368872399',
//     issue: 'पति पत्नी / घरेलू विवाद',
//     location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
//     date: 'Oct 20, 2021',
//   },
//   {
//     id: '3',
//     name: 'प्रतिमा',
//     phone: '78987498789743984',
//     issue: 'महिलाओं से संबंधित अपराध',
//     location: 'उत्तर प्रदेश / आगरा / एतमादपुर / कुबेरपुर',
//     date: 'Oct 20, 2021',
//   },
// ];

const CompletedComplaints = ({navigation}) => {
  const [completedComplaints, setCompletedComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const getComplaintList = async () => {
    const response = await axios.post(
      API_URL,
      {
        UserId: 5,
        BeatAreaId: 2,
        FromDate: '2025-09-01',
        ToDate: '2025-09-01',
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    if (response?.data?.success === true) {
      console.log(response.data.data);
      setCompletedComplaints(response.data.data);
    } else {
      Alert.alert(response.data.message);
    }
  };

  useEffect(() => {
    getComplaintList();
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
      <View style={styles.container}>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />

        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchText}>जानकारी से खोजें</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.summaryContainer}>
          <View style={styles.row}>
            <Text style={styles.summaryText}>
              कुल कार्यवाही पूर्ण शिकायत - {completedComplaints.length}
            </Text>
            <Icon name="refresh" size={24} color="green" />
          </View>
          <View style={styles.row}>
            <Icon name="arrow-downward" size={24} color="green" />
            <Icon name="sort-by-alpha" size={24} color="green" />
            <Icon name="info-outline" size={24} color="black" />
          </View>
        </View>

        {/* Complaints List */}
        <FlatList
          data={completedComplaints}
          keyExtractor={item => item.ComplaintId.toString()}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: '3%'}}>
              <ComplaintCard
                name={item.ComplainantName || 'N/A'}
                phone={item.ComplainantNumber || 'N/A'}
                category={item.ProblemName || 'Unknown'}
                address={item.location || 'Not available'}
                date={
                  item.ComplaintDate
                    ? new Date(
                        parseInt(item.ComplaintDate.match(/\d+/)[0]),
                      ).toLocaleDateString()
                    : 'N/A'
                }
                onPress={() =>
                  navigation.navigate('ComplaintDescription', {
                    complaint: item,
                  })
                }
                color="#0D92F4"
                status="completed"
              />
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    gap: 5,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#B63A1E',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '2%',
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B63A1E',
  },
  complaintCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: 'green',
  },
  modalContent: {
    width: '70%',
    backgroundColor: '#FFF',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'flex-start',
    gap: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EFDCAB',
  },
  logo: {
    width: '60%',
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C2185B',
  },
  subtitle: {
    fontSize: 12,
    color: '#C2185B',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    paddingLeft: '6%',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#C2185B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompletedComplaints;

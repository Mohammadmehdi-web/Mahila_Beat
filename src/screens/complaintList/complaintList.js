import React, {use, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Search from '../../components/search/search';

const API_URL = 'http://re.auctech.in/MobileAppApi/getTotalComplaintMaster';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxtotalComplaint';

const ComplaintList = ({navigation}) => {
  const {UserId} = useSelector(state => state.auth.userDetails);
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const extractDate = item => {
    if (item.ComplaintDate1 && item.ComplaintDate1.includes('/Date(')) {
      const timestamp = parseInt(item.ComplaintDate1.match(/\d+/)[0]); // Extract number
      return new Date(timestamp);
    }
    if (item.ComplaintDate) {
      const [day, month, year] = item.ComplaintDate.split('/');
      return new Date(`${year}-${month}-${day}`);
    }
    return null;
  };

  const getComplaintList = async () => {
    const response = await axios.post(
      API_URL,
      {
        UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    if (response?.data?.success === true) {
      console.log(response.data.data);
      
      setComplaints(response.data.data);
      setFilteredComplaints(response.data.data);
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getComplaintList();
  }, []);

  const handleSearch = (selectedArea, fromDate, toDate) => {
    console.log('🔍 Search Params:', {selectedArea, fromDate, toDate});

    if (!selectedArea && !fromDate && !toDate) {
      setFilteredComplaints(complaints);
      return;
    }

    const filtered = complaints.filter(item => {
      console.log('📌 Raw ComplaintDate:', item.ComplaintDate);

      if (!item.ComplaintDate || !item.ComplaintDate.match(/\d+/)) {
        console.log('❌ Skipping invalid ComplaintDate:', item);
        return false;
      }

      // Extract timestamp and create Date object
      const complaintDate = new Date(
        parseInt(item.ComplaintDate.match(/\d+/)[0]),
      );

      console.log(
        '✅ Parsed ComplaintDate:',
        complaintDate.toISOString().split('T')[0],
      );

      // Convert `fromDate` and `toDate` to timestamps for accurate comparison
      const from = fromDate ? new Date(fromDate).getTime() : null;
      const to = toDate ? new Date(toDate).getTime() : null;
      const complaintTimestamp = complaintDate.getTime();

      if (from)
        console.log(
          '📆 From Date:',
          new Date(from).toISOString().split('T')[0],
        );
      if (to)
        console.log('📆 To Date:', new Date(to).toISOString().split('T')[0]);

      // Apply date filtering using timestamps
      const isWithinRange =
        (!from || complaintTimestamp >= from) &&
        (!to || complaintTimestamp <= to);

      console.log(
        `📅 ${complaintDate.toISOString().split('T')[0]} is ${
          isWithinRange ? '✅ MATCHED' : '❌ NOT MATCHED'
        }`,
      );

      return isWithinRange;
    });

    console.log('📌 Final Filtered Results:', filtered.length);
    setFilteredComplaints(filtered);
  };

  const handleComplaintPress = complaint => {
    // Navigate and pass only the necessary data
    navigation.navigate('ComplaintDescription', {
      complaint: complaint, // Pass the complaint object
    });
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
        <StatusBar />
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />

        <View style={styles.summaryContainer}>
          <Search handleChange={handleSearch} />
          <View style={styles.row}>
            <Text style={styles.summaryText}>
              कुल लंबित शिकायत - {filteredComplaints.length}
            </Text>
            <Icon
              name="refresh"
              size={24}
              color="green"
              onPress={getComplaintList}
            />
          </View>
          <View style={styles.row}>
            <Icon name="arrow-downward" size={24} color="green" />
            <Icon name="sort-by-alpha" size={24} color="green" />
            <Icon name="info-outline" size={24} color="black" />
          </View>
        </View>

        <FlatList
          style={{gap: 10}}
          data={filteredComplaints}
          keyExtractor={item => item.ComplaintId.toString()}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: '3%'}}>
              {item ? (
                <ComplaintCard
                  id={item.ComplaintId.toString()}
                  name={item.ComplainantName || 'N/A'}
                  phone={item.ComplainantNumber || 'N/A'}
                  category={item.ProblemName || 'Unknown'}
                  address={item.location || 'Not available'}
                  date={
                    item.ComplaintDate
                    // ? new Date(
                    //     parseInt(item.ComplaintDate.match(/\d+/)[0]),
                    //   ).toLocaleDateString()
                    // : 'N/A'
                  }
                  onPress={() => handleComplaintPress(item)}
                  color="#D44624"
                />
               ) : (
                <></>
              )} 
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
    paddingBottom:"1%"
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#B63A1E',
    padding: '4%',
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
  card: {
    backgroundColor: '#D44624',
    padding: 12,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardPhone: {
    fontSize: 16,
    color: '#fff',
  },
  cardIssue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#fff',
  },
  cardDate: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
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

export default ComplaintList;

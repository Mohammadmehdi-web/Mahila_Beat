import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {useSelector} from 'react-redux';

import Header from '../../components/header/header';
import ComplaintCard from '../../components/complainCard/complaintCard';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import Search from '../../components/search/search';
import {BASE_URL} from '@env'


const API_URL = `${BASE_URL}/MobileAppApi/GetTotalComplaintDetails`;
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxTotalComplaintdssdtedss';

const AllComplaints = ({navigation}) => {
  const {UserId} = useSelector(state => state.auth.userDetails);
  const [allComplaints, setAllComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const getAllComplaints = async () => {
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
      setAllComplaints(response.data.data);
      setFilteredComplaints(response.data.data);
      set;
    } else {
      Alert.alert(response.data.message);
    }
  };

  useEffect(() => {
    getAllComplaints();
  }, []);

  const handleSearch = (selectedArea, fromDate, toDate) => {
    console.log('Search Params:', {selectedArea, fromDate, toDate});

    if (!selectedArea && !fromDate && !toDate) {
      setFilteredComplaints(allComplaints);
      return;
    }

    const filtered = allComplaints.filter(item => {
      console.log('Raw ActivityDate:', item.ComplaintDate);

      if (
        !item.ComplaintDate ||
        item.ComplaintDate === 'null' ||
        item.ComplaintDate.trim() === ''
      ) {
        console.log('Skipping complaint with invalid date:', item);
        return false;
      }
      const [day, month, year] = item.ComplaintDate.split('/');
      const complaintDate = new Date(`${year}-${month}-${day}`);

      console.log('Parsed Date:', complaintDate);

      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      console.log('From Date:', from, 'To Date:', to);

      return (!from || complaintDate >= from) && (!to || complaintDate <= to);
    });

    console.log('Filtered Results:', filtered.length);
    setFilteredComplaints(filtered);
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
              कुल कार्यवाही पूर्ण शिकायत - {filteredComplaints.length}
            </Text>
            <Icon
              name="refresh"
              size={24}
              color="green"
              onPress={() => getAllComplaints()}
            />
          </View>
        </View>

        <FlatList
          data={filteredComplaints}
          keyExtractor={item => item.ComplaintId.toString()}
          renderItem={({item}) => (
            <View style={{flex: 1, paddingHorizontal: '3%'}}>
              {item.ComplaintStatusName === 'Complete' ? (
                <ComplaintCard
                  id={item.ComplaintId.toString()}
                  name={item.ComplainantName || 'N/A'}
                  phone={item.ComplainantNumber || 'N/A'}
                  category={item.ProblemName || 'Unknown'}
                  address={item.location || 'Not available'}
                  date={item.ComplaintDate}
                  onPress={() =>
                    navigation.navigate('ComplaintDescription', {
                      fromScreen: 'AllComplaints',
                      complaint: item,
                    })
                  }
                  color="#0D92F4"
                  status="completed"
                />
              ) : (
                <ComplaintCard
                  key={item.ComplaintId.toString()}
                  name={item.ComplainantName || 'N/A'}
                  phone={item.ComplainantNumber || 'N/A'}
                  category={item.ProblemName || 'Unknown'}
                  address={item.location || 'Not available'}
                  date={item.ComplaintDate}
                  onPress={() =>
                    navigation.navigate('ComplaintDescription', {
                      complaint: item,
                    })
                  }
                  color="#D44624"
                />
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

export default AllComplaints;

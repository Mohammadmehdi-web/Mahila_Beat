import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import axios from 'axios';

import Header from '../../components/header/header';
import VisitCard from '../../components/visitCard/visitCard';
import SideModal from '../../components/sideModal/sideModal';
import Search from '../../components/search/search';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';

const API_URL = 'http://re.auctech.in/MobileAppApi/GetYourVisitDetails'
const BEARER_TOKEN='zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxYourVisitDetailsdssdtetts'

// const complaints = [
//   {
//     location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / अछार',
//     officer: 'उ0नि0 श्री देवेंद्र सिंह - 6393292234',
//     distance: '0.0',
//     date: 'Oct 22, 2021',
//   },
//   {
//     location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / अछार',
//     officer: 'प्रभा - 9585555555',
//     distance: '21.0',
//     date: 'Oct 21, 2021',
//   },
//   {
//     location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / कुबेरपुर',
//     officer: 'प्रभा - 9585555555',
//     distance: '21.0',
//     date: 'Oct 21, 2021',
//   },
//   {
//     location: 'उत्तर प्रदेश / आगरा / एत्मादपुर / कचा एत्मादपुर',
//     officer: 'उ0नि0 श्री देवेंद्र सिंह - 6393292234',
//     distance: '21.0',
//     date: 'Oct 20, 2021',
//   },
// ];

const MyVisits = ({navigation}) => {
  const {UserId} = useSelector(state => state.auth.userDetails);
  const [myVisits, setMyVisits] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const getMyVisitsList = async () => {
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
      setMyVisits(response.data.data);
      setFilteredData(response.data.data); 
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getMyVisitsList();
  }, []);

  const handleSearch = (selectedArea, fromDate, toDate) => {
    if (!selectedArea && !fromDate && !toDate) {
      setFilteredData(myVisits); // If no filters, show all data
      return;
    }
  
    const filtered = myVisits.filter(item => {
      const matchesArea = selectedArea ? item.MahilaBeatName === selectedArea : true;
  
      const visitDate = new Date(item.ActivityDate); // Convert API date to Date object
  
      const matchesDateRange =
        (!fromDate || visitDate >= new Date(fromDate)) && 
        (!toDate || visitDate <= new Date(toDate));
  
      return matchesArea && matchesDateRange;
    });
    console.log("FIltered",filtered)
    setFilteredData(filtered);
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
      <View>
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.section}>
            <Search handleChange={handleSearch}/>
            <View style={styles.statusBar}>
              <Text style={styles.totalCount}>🔵 कुल भ्रमण - {myVisits.length}</Text>
              <Icon name="reload" size={20} color="green" />
              <Icon name="arrow-down" size={20} color="green" />
              <Icon
                name="sort-alphabetical-ascending"
                size={20}
                color="green"
              />
            </View>
          </View>

          {filteredData.length?
             filteredData.map((item, index) => (
            <VisitCard
              key={index}
              id={index}
              location={`${item.StateName}/ ${item.DistrictName}/ ${item.ThanaName.trim()}`}
              officer={`${item.PoliceName} - ${item.MobileNumber}`}
              distance={item.DistanceActivity}
              date={item.ActivityDate}
              onPress={() =>
                navigation.navigate('VisitInfo', {visitInfo: item})
              }
            />
          )):
          <Text>No data Found</Text>
          }
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    backgroundColor: '#d32f2f',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  totalCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default MyVisits;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import axios from 'axios';

import Header from '../../components/header/header'; // Your existing header component
import VisitCard from '../../components/visitCard/visitCard'; // Import the card component
import SideModal from '../../components/sideModal/sideModal';
import Search from '../../components/search/search';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';

const API_URL = 'http://re.auctech.in/MobileAppApi/GetTotalVisitDetails';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxTotalVisitDetailsdssdteds';

const AllVisits = ({navigation}) => {
  const {UserId} = useSelector(state => state.auth.userDetails);
  const [visits, setVisits] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const getVisitsList = async () => {
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
      setVisits(response.data.data);
      setFilteredData(response.data.data)
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getVisitsList();
  }, []);

  const handleSearch = (selectedArea, fromDate, toDate) => {
    if (!selectedArea && !fromDate && !toDate) {
      setFilteredData(visits); 
      return;
    }

    const filtered = visits.filter(item => {
      const matchesArea = selectedArea
        ? item.MahilaBeatName === selectedArea
        : true;

      const visitDate = new Date(item.ActivityDate); 

      const matchesDateRange =
        (!fromDate || visitDate >= new Date(fromDate)) &&
        (!toDate || visitDate <= new Date(toDate));

      return matchesArea && matchesDateRange;
    });
    console.log("filtered",filtered)
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
              <Text style={styles.totalCount}>
                🔵 कुल भ्रमण - {visits.length}
              </Text>
              <Icon name="reload" size={20} color="green" />
              <Icon name="arrow-down" size={20} color="green" />
              <Icon
                name="sort-alphabetical-ascending"
                size={20}
                color="green"
              />
            </View>
          </View>

          {filteredData.length ? (
            filteredData.map((item, index) => (
              <VisitCard
                key={index}
                location={`${item.StateName}/ ${
                  item.DistrictName
                }/ ${item.ThanaName.trim()}`}
                officer={`${item.PoliceName} - ${item.MobileNumber}`}
                distance={item.DistanceActivity}
                date={item.ActivityDate}
                onPress={() =>
                  navigation.navigate('VisitInfo', {visitInfo: item})
                }
              />
            ))
          ) : (
            <Text>No data found</Text>
          )}
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

export default AllVisits;

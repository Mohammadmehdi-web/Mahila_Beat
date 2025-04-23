import React, {useEffect, useState} from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import Header from '../../components/header/header';
import SummaryTable from '../../components/summaryTable/summaryTable';
import SideModal from '../../components/sideModal/sideModal';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {BASE_URL} from '@env'

const SUM_API = `${BASE_URL}/MobileAppApi/getTotalDashboardMaster`;
const SUM_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxtotalDashboard';
const AREA_API =
  `${BASE_URL}/MobileAppApi/GetAreaWiseActivityCountDetails`;
const AREA_BEARER =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxGetAreaWiseActivityCountDetailsddd';

const Dashboard = ({navigation}) => {
  const {UserId} = useSelector(state => state.auth.userDetails);

  const [areaTotal, setAreaTotal] = useState([]);
  const [totalCount, setTotalCount] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const getAreaList = async () => {
    const response = await axios.post(
      AREA_API,
      {
        UserId,
      },
      {
        headers: {
          Authorization: `Bearer ${AREA_BEARER}`,
        },
      },
    );
    if (response.data.success === true) {
      console.log(response.data.data);
      setAreaTotal(response.data.data);
    } else {
      Alert.alert('आपकी सारांश जानकारी मौजूद नहीं है');
      setAreaTotal([])
    }
  };

  const getTotalSummaryDetails = async () => {
    const response = await axios.post(
      SUM_API,
      {UserId},
      {
        headers: {
          Authorization: `Bearer ${SUM_BEARER}`,
        },
      },
    );

    if (response.data.success === true) {

      setTotalCount(response?.data?.data);
    } else {
      Alert.alert('आपकी सारांश जानकारी मौजूद नहीं है');
      setTotalCount({});
    }
  };

  useEffect(() => {
    getTotalSummaryDetails();
    getAreaList();
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
        <StatusBar />
        <Header
          title="महिला बीट"
          onMenuPress={() => setModalVisible(true)}
          onProfilePress={() => setInfoVisible(true)}
        />
        {totalCount && areaTotal ? (
          <SummaryTable totalCount={totalCount} totalArea={areaTotal} />
        ) : (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{fontSize: 16, color: 'gray'}}>
              डेटा लोड हो रहा है...
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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

export default Dashboard;

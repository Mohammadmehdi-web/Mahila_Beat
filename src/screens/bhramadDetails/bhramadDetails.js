import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal'

import Logo from '../../assets/policeLogo.png'
import Header from '../../components/header/header'; 
import SideModal from '../../components/sideModal/sideModal';

const BhramadDetails = ({navigation}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
    
      const menuItems = [
        {label: ' एप होम', icon: 'home', screen:'Home'},
        {label: ' डैशबोर्ड', icon: 'view-dashboard', screen:"Dashboard"},
        {label: ' मेरी बीट', icon: 'plus-box',screen:"MeriBeat"},
        {label: ' लंबित शिकायत', icon: 'alert-circle',screen:"ComplaintList"},
        {label: ' निस्तारित शिकायत', icon: 'check-circle',screen:"CompletedComplaints"},
        {label: ' सभी शिकायत', icon: 'file-document',screen: "AllComplaints"},
        {label: ' सभी भ्रमण', icon: 'car', screen: "AllVisits"},
        {label: ' आपके भ्रमण', icon: 'walk'},
        {label: ' लॉग आउट', icon: 'logout', screen:'Login'},
      ];
  const mahilaDetails = [
    {id: 1, name: 'premvati', phn: 7042582368},
    {id: 2, name: 'premvati', phn: 7042582368},
    {id: 3, name: 'premvati', phn: 7042582368},
  ];
  return (
    <>
    <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    <View style={styles.container}>
    <Header title="महिला बीट" onMenuPress={() => setModalVisible(true)} />

      <ScrollView contentContainerStyle={styles.content}>
 <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('VisitDetails')}>
            <Icon name="arrow-left" size={20} />
          </TouchableOpacity>
          <Text style={styles.heading}>संवाद का विवरण</Text>
        </View>
        {/* Information Card */}
        <View style={styles.card}>
          <Text style={styles.label}>बीट का नाम</Text>
          <Text style={styles.value}>महिला बीट 2</Text>

          <Text style={styles.label}>क्षेत्र का नाम</Text>
          <Text style={styles.value}>
            उत्तर प्रदेश / आगरा / एतमादपुर / घड़ी रणपू
          </Text>

          <Text style={styles.label}>भरण में सहयोगी का नाम</Text>
          <Text style={styles.value}>
            नग 4961 संभावित लाभ - 887451184{'\n'}
            नगीना की देवेंद्र सिंह - 639322234
          </Text>

          <Text style={styles.label}>भरण का दिनांक व समय</Text>
          <Text style={styles.value}>Oct 23 2021 12:59PM</Text>

          <Text style={styles.label}>गाँव / मोहल्ले से दूरी</Text>
          <Text style={styles.value}>4.4 मीटर</Text>
        </View>

        {/* Image Section */}
        {/* <Image source={require('../assets/sample.jpg')} style={styles.image} /> */}

        {/* Pink Button */}
        <View style={styles.pinkButton}>
          <Text style={styles.buttonText}>संवाद का विवरण</Text>
        </View>

        {/* Mission Shakti Kaksh (Dropdown Section) */}
        <TouchableOpacity
          style={styles.accordion}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={styles.accordionText}>मिशन शक्तिक कक्ष</Text>
          <MaterialIcon
            name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdownContent}>
            <View style={{gap:10}}>
              <View style={[styles.pinkButton, {fontSize: 10}]}>
                <Text style={styles.buttonText}>
                  संदर्भ में सम्मिलित किन्ही तीन महिलाओं की जानकारी
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>संवाद का स्थान</Text>
                <Text style={styles.value}>मिशन शक्तिक कक्ष</Text>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: '#ccc',
                  marginVertical: 10,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[styles.label, {fontSize: 16}]}>
                  सम्वाद म समिलित महिलाओं की संख्या
                </Text>
                <Text style={styles.value}>12</Text>
              </View>

              {/* तीन महिला की जानकारी */}
              {mahilaDetails.map(item => (
                <View key={item.id} style={{gap:5}}>
                  <View key={item.id} style={styles.pinkButtonSmall}>
                    <Text style={styles.buttonText}>
                      {item.id}. महिला की जानकारी
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.label}>मोबाइल नं</Text>
                      <Text style={styles.value}>{item.phn}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <View
                style={{
                  height: 1,
                  backgroundColor: '#ccc',
                  marginVertical: 10,
                }}
              />
              <View
                style={{alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.label}>सरकारी योजनाओं की जानकारी</Text>
                <Text style={styles.value}>प्रधानमंत्री उज्ज्वला योजना</Text>
              </View>
            </View>
          </View>
        )}

       <View style={styles.pinkButton}>
          <Text style={styles.buttonText}>शिकायत का विवरण</Text>
        </View>
        {/* Shikayat ka Vivran Section */}
        <TouchableOpacity style={styles.accordion}>
          <Text style={styles.accordionText}>स्कूल / कॉलेज जाने वाली लड़कियों से छेड़छाड़</Text>
          {/* <Icon name="keyboard-arrow-down" size={24} color="#fff" /> */}
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
    gap:15
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
    padding: "4%",
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    gap: 10,
  }, modalContent: {
    width: "70%",
    backgroundColor: "#FFF",
    borderTopRightRadius:10,
    borderBottomRightRadius:10,
    alignItems: "flex-start",
    gap:20
  },
  header: {
    width:"100%",
    alignItems: "center",
    backgroundColor:"#EFDCAB"
  },
  logo: {
    width: "60%",
    height: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2185B",
  },
  subtitle: {
    fontSize: 12,
    color: "#C2185B",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
    paddingLeft:"6%",
    gap: 10
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#C2185B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BhramadDetails;

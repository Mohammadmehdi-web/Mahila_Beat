import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import SideModal from '../../components/sideModal/sideModal';
import Header from '../../components/header/header';

const VisitInfo = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SideModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
      <View style={styles.container}>
        {/* Header Component */}
        <Header title="महिला बीट" onMenuPress={() => setModalVisible(true)} />

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>भ्रमण की जानकारी</Text>

          {/* Information Card */}
          <View style={styles.card}>
            <Text style={styles.label}>बीट का नाम</Text>
            <Text style={styles.value}>महिला बीट 2</Text>

            <Text style={styles.label}>क्षेत्र का नाम</Text>
            <Text style={[styles.value, styles.highlight]}>
              उत्तर प्रदेश / आगरा / एत्मादपुर / अमर कालोनी
            </Text>

            <Text style={styles.label}>भ्रमण में सहकर्मी का नाम</Text>
            <Text style={[styles.value, styles.highlight]}>
              कांस्टेबल 4961 अमितेश कुमार - 8874815184,{'\n'}
              उपनिरीक्षक श्री देवेंद्र सिंह - 6393292234
            </Text>

            <Text style={styles.label}>भ्रमण का दिनांक व समय</Text>
            <Text style={[styles.value, styles.date]}>Oct 23 2021 11:46AM</Text>

            <Text style={styles.label}>गांव / मोहल्ले से दूरी</Text>
            <Text style={[styles.value, styles.highlight]}>196.4 मीटर</Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>संवत का विवरण</Text>
          </TouchableOpacity>

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
});

export default VisitInfo;

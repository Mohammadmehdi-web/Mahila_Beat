import React from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';

import Logo from '../../assets/policeLogo.png';
import CriminalVerificationImage from '../../assets/criminal_verification_img.jpg'
import SaveWomenImg from '../../assets/save_women.jpg'
import Card from '../../components/card/card';

const HomeScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
        <View style={styles.headingContainer}>
          <Text style={[styles.heading, {color: "red"}]}>आगरा जोन पुलिस</Text>
          <Text style={[styles.heading,{color:"darkblue"}]}>सुरक्षा आपकी,संकल्प हमारा</Text>
        </View>
      </View>
      <View style={styles.cardcontainer}>
      <Card
        image={CriminalVerificationImage} 
        title="अपराधी के सत्यापन हेतु" 
        backgroundColor="#8E44AD"
        onPress={() => console.log("Screen not done")} 
      />
      <Card 
        image={SaveWomenImg} 
        title="महिला बीट की कार्यवाई" 
        backgroundColor="#82E0AA" 
        onPress={() => navigation.navigate("AreaDetails")}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:100,
    backgroundColor: '#ffffff',
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
    top: '30%',
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    gap: 70,
  },
  headingContainer:{
    alignItems:"center",
    justifyContent:"center",
  },
  heading:{
    fontFamily:'Noto Sans Devanagari',
    fontSize: 16,
    fontWeight:"700",
  },
  cardcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
    backgroundColor: "#fff",
    gap:20
  },
});

export default HomeScreen;

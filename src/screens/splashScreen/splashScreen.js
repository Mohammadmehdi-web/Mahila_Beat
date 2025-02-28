import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

import Logo from '../../assets/policeLogo.png'

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo} 
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
  },
  logo: {
    width: "70%",
    height: "70%",
    resizeMode: 'contain',
  },
});

export default SplashScreen;

import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  Image,
  Text,
} from 'react-native';

import Logo from '../../assets/policeLogo.png';

const Login = ({navigation}) => {
  const logoPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoPosition, {
      toValue: -120,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={Logo}
        style={[styles.logo, {transform: [{translateY: logoPosition}]}]}
      />

      {/* Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.text}>नमस्ते, आपका स्वागत है!</Text>
          <View style={[styles.headingContainer, {gap: 10}]}>
            <Text style={[styles.text, {fontWeight: '700'}]}>लॉग इन</Text>
            <Text style={[styles.text, {fontSize: 14}]}>
              कृपया अपना मोबाइल नंबर और पासवर्ड दर्ज करें
            </Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="फ़ोन नंबर"
            text
            keyboardType="default"
            placeholderTextColor={"#ccc"}
          />

          <TextInput
            style={styles.input}
            placeholder="पासवर्ड"
            secureTextEntry
            placeholderTextColor={"#ccc"}
          />
        </View>
        <View>
        <Button
          style={{borderRadius: 20, fontSize: 14}}
          title="लॉग इन"
          onPress={() => navigation.navigate("Home")}
        />
        </View>
      </View>
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
    width: 120,
    height: 120,
    resizeMode: 'contain',
    position: 'absolute',
    top: '30%',
  },
  formContainer: {
    width: '80%',
    marginTop: '50%',
    gap: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 8,
    paddingHorizontal: 10,
    color:"black"
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  text: {
    fontFamily: 'Noto Sans Devanagari',
    fontWeight: 600,
    fontSize: 26,
  },
  inputContainer:{
    width:"100%",
    justifyContent:"center",
    gap:10
  }
});

export default Login;

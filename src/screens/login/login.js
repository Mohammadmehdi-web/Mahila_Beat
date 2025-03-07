import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  Image,
  Text,
  Alert,
} from 'react-native';
import axios from 'axios';

import Logo from '../../assets/policeLogo.png';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../redux/slice/authSlice';

const API_URL = 'http://re.auctech.in/MobileAppApi/Login';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxla';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const logoPosition = useRef(new Animated.Value(0)).current;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const loginUser = async () => {
    const response = await axios.post(
      API_URL,
      {
        UserName: username,
        Password: password,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    if (response?.data?.success === true) {
      const userDetails = response.data.sessionData;
      dispatch(loginSuccess(userDetails));
      navigation.navigate('Home');
    } else {
      Alert.alert(response.data.message);
    }
  };

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
            value={username}
            onChangeText={setUsername}
            text
            keyboardType="default"
            placeholderTextColor={'#ccc'}
          />

          <TextInput
            style={styles.input}
            placeholder="पासवर्ड"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#ccc'}
          />
        </View>
        <View>
          <Button
            style={{borderRadius: 20, fontSize: 14}}
            title="लॉग इन"
            onPress={loginUser}
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
    color: 'black',
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
  inputContainer: {
    width: '100%',
    justifyContent: 'center',
    gap: 10,
  },
});

export default Login;

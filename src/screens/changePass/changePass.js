import React, {use, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import Logo from '../../assets/policeLogo.png';
import Header from '../../components/header/header';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import SideModal from '../../components/sideModal/sideModal';
import {validatePasswords} from '../../utils/validation';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../redux/slice/authSlice';

const API = 'http://re.auctech.in/MobileAppApi/UpdatePassword';
const BEARER_TOKEN =
  'zhlbnjuNwxXJdasdge454zz+9J6LZiBYNnetrbGUHTPJGco6G7SZiJzQMVsumrp/y6g==:ZlpToWj3Oau537ggbcvsfsL1X6HhgvFp3XsadIX2O+hxUpdatepassword';

const ChangePasswordScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const {UserId, MobileNumber,Password} = useSelector(state => state.auth.userDetails);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  console.log(Password);
  

  const handleChangePassword = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }


    const error = validatePasswords(
      Password,
      currentPassword,
      newPassword,
      confirmPassword,
    );
    console.log(error);

    if (error) {
      Alert.alert('Error', error);
      return;
    }

    postChangePassword();
  };

  const postChangePassword = async () => {
    try {
      console.log(UserId, MobileNumber, newPassword);

      const response = await axios.post(API, {
        userid: UserId,
        MObile: MobileNumber,
        Password: newPassword,
      },
      {
        headers:{
          Authorization:`Bearer ${BEARER_TOKEN}`
        }
      }
    );

      console.log(response.data.message);

      if (response.data.success === true) {
        const message =
          response.data.data[0].message || 'Password updated successfully';
        Alert.alert('Success', 'Password updated successfully');
        dispatch(logout())
        navigation.navigate('Login')
      } else {
        Alert.alert('Error', 'Failed to update password');
      }
    } catch (error) {
      console.log('Error:', 'Failed to update password');
    }
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
      <StatusBar />
      <Header
        title="महिला बीट"
        onMenuPress={() => setModalVisible(true)}
        onProfilePress={() => setInfoVisible(true)}
      />
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.title}>Change Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          placeholderTextColor="grey"
          onChangeText={setCurrentPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          placeholderTextColor="grey"
          onChangeText={setNewPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          placeholderTextColor="grey"
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>पासवर्ड बदलें</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: '60%',
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    color: '#000',
    width: '90%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    // marginBottom: 15,
    // paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    width: '80%',
    backgroundColor: '#d32f2f',
    paddingVertical: '2%',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;

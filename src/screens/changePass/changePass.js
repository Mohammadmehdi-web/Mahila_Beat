import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Logo from '../../assets/policeLogo.png';
import Header from '../../components/header/header';
import UserInfoCard from '../../components/userInfoCard/userInfoCard';
import SideModal from '../../components/sideModal/sideModal';
import { validatePasswords } from '../../utils/validation';

const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const handleChangePassword = () => {
    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const error = validatePasswords(currentPassword, newPassword, confirmPassword)

    if (error) {
      Alert.alert(
        'Error',
        {error}
      );
      return;
    }

    // Proceed with password change logic (e.g., API call)
    Alert.alert('Success', 'Password has been changed successfully');
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

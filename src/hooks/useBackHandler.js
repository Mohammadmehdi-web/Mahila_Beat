// import { useEffect } from 'react';
// import { BackHandler } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const useBackHandler = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     const backAction = () => {
//       if (navigation.canGoBack()) {
//         navigation.goBack();
//         return true; // Prevent default behavior
//       }
//       return false; // Let system handle exit
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction
//     );

//     // ✅ Correct way to remove event listener in React Native 0.71+
//     return () => backHandler.remove();
//   }, [navigation]);
// };

// export default useBackHandler;

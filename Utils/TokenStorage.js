import AsyncStorage from '@react-native-async-storage/async-storage';

const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error saving token to AsyncStorage:', error);
  }
};

const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Error retrieving token from AsyncStorage:', error);
    return null;
  }
};

const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token from AsyncStorage:', error);
  }
};

export {saveTokenToStorage, removeTokenFromStorage, getTokenFromStorage};

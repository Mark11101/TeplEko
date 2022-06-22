import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAsyncStorageData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
  }
};

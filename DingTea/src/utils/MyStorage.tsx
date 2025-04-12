import AsyncStorage from '@react-native-async-storage/async-storage';
export default class MyStorage {
  static get = async (key: string) => {
    const result = await AsyncStorage.getItem(key);
    if (result) {
      const parseValue = JSON.parse(result);
      return parseValue;
    }
    return null;
  };
  static create = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  };
  static delete = async (key: string) => {
    await AsyncStorage.removeItem(key);
  };
  static multiDelete = async (keys: string[]) => {
    await AsyncStorage.multiRemove(keys);
  };
  static deleteAll = async () => {
    await AsyncStorage.clear();
  };
}

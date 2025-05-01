import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [formData, setFormData] = useState([]);

  const saveData = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('formData');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const chickens = [...parced, data];
      await AsyncStorage.setItem('formData', JSON.stringify(chickens));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('formData');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setFormData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeChicken = async chicken => {
    const jsonValue = await AsyncStorage.getItem('formData');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== chicken.id);

    await AsyncStorage.setItem('formData', JSON.stringify(filtered));
    console.log('removed');
  };

  const value = {saveData, formData, getData, removeChicken};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

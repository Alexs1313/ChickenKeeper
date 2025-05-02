import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

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
    const filtered = data.filter(item => item.id !== chicken);
    console.log('removedChick', filtered);
    setFormData(filtered);
    await AsyncStorage.setItem('formData', JSON.stringify(filtered));

    console.log('remove');
  };

  //--------------sales--------------->

  const saveSales = async sale => {
    try {
      const value = await AsyncStorage.getItem('sales');
      let parced = value !== null ? JSON.parse(value) : [];

      const sales = [...parced, sale];
      await AsyncStorage.setItem('sales', JSON.stringify(sales));
      console.log('sales', sales);
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const value = {saveData, formData, getData, removeChicken, saveSales};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

const measurment = [
  {
    id: 1,
    title: 'Gram',
    selected: true,
  },
  {
    id: 2,
    title: 'Ounces',
    selected: false,
  },
];

const curr = [
  {
    id: 1,
    title: 'Dollar',
    selected: true,
  },
  {
    id: 2,
    title: 'Ruble',
    selected: false,
  },
  {
    id: 3,
    title: 'Euro',
    selected: false,
  },
];

export const StoreProvider = ({children}) => {
  const [formData, setFormData] = useState([]);
  const [sales, setSales] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState(measurment);
  const [currency, setCurrency] = useState(curr);
  const [isEnabled, setIsEnabled] = useState(false);

  console.log('formdata', formData);

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

  const removeChicken = async selectedChicken => {
    const jsonValue = await AsyncStorage.getItem('formData');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedChicken);

    setFormData(filtered);
    await AsyncStorage.setItem('formData', JSON.stringify(filtered));

    console.log('remove');
  };

  // sales

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

  const getSales = async () => {
    try {
      const savedData = await AsyncStorage.getItem('sales');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSales(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeSale = async sale => {
    const jsonValue = await AsyncStorage.getItem('sales');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== sale);
    console.log('removed', filtered);
    setSales(filtered);
    await AsyncStorage.setItem('sales', JSON.stringify(filtered));

    console.log('remove');
  };

  // reminders

  const saveReminders = async reminder => {
    try {
      const value = await AsyncStorage.getItem('reminders');
      let parced = value !== null ? JSON.parse(value) : [];

      const reminders = [...parced, reminder];
      await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
      console.log('reminders', reminders);
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getReminders = async () => {
    try {
      const savedData = await AsyncStorage.getItem('reminders');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setReminders(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeReminders = async reminder => {
    const jsonValue = await AsyncStorage.getItem('reminders');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== reminder);
    console.log('removed', filtered);
    setReminders(filtered);
    await AsyncStorage.setItem('reminders', JSON.stringify(filtered));

    console.log('remove');
  };

  const value = {
    saveData,
    formData,
    getData,
    removeChicken,
    saveSales,
    getSales,
    removeSale,
    sales,
    saveReminders,
    getReminders,
    removeReminders,
    reminders,
    selectedMeasurement,
    setSelectedMeasurement,
    currency,
    setCurrency,
    isEnabled,
    setIsEnabled,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

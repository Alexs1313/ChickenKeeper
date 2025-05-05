import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';

import Layout from '../../components/Layout';
import {useStore} from '../../store/context';

const Settings = () => {
  const {
    getReminders,
    removeReminders,
    selectedMeasurement,
    setSelectedMeasurement,
    currency,
    setCurrency,
    setIsEnabled,
    isEnabled,
  } = useStore();
  const [showMeasurement, setShowMeasurement] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    getReminders();
  }, []);

  const selectMeasurement = SelectedId => {
    const checked = selectedMeasurement.map(item => {
      if (item.id === SelectedId) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });
    setSelectedMeasurement(checked);
    setShowMeasurement(false);
  };

  const selectCurrency = SelectedId => {
    const checked = currency.map(item => {
      if (item.id === SelectedId) {
        return {
          ...item,
          selected: true,
        };
      }
      return {
        ...item,
        selected: false,
      };
    });
    setCurrency(checked);
    setShowCurrency(false);
  };

  return (
    <Layout>
      <ScrollView>
        <View>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Settings</Text>
          </View>
          <View style={{alignItems: 'center', marginBottom: 30}}>
            <Image source={require('../../assets/images/settings.png')} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sectionText}>Unit of Measurement</Text>
              <TouchableOpacity
                onPress={() => setShowMeasurement(!showMeasurement)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {selectedMeasurement.map(item => {
                  if (item.selected) {
                    return (
                      <Text style={styles.secondaryText} key={item.id}>
                        {item.title}
                      </Text>
                    );
                  }
                })}
                {showMeasurement ? (
                  <Image
                    source={require('../../assets/icons/hideDetails.png')}
                    tintColor={'#fff'}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/details.png')}
                    tintColor={'#fff'}
                  />
                )}
              </TouchableOpacity>
            </View>
            {showMeasurement && (
              <View>
                {selectedMeasurement.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => selectMeasurement(item.id)}
                    style={{
                      alignItems: 'flex-end',
                      paddingRight: 12,
                      marginTop: 8,
                    }}>
                    <Text style={[styles.secondaryText]}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.sectionText}>Currency Selection</Text>
              <TouchableOpacity
                onPress={() => setShowCurrency(!showCurrency)}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                {currency.map(item => {
                  if (item.selected) {
                    return (
                      <Text style={styles.secondaryText} key={item.id}>
                        {item.title}
                      </Text>
                    );
                  }
                })}
                {showCurrency ? (
                  <Image
                    source={require('../../assets/icons/hideDetails.png')}
                    tintColor={'#fff'}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/details.png')}
                    tintColor={'#fff'}
                  />
                )}
              </TouchableOpacity>
            </View>
            {showCurrency && (
              <View>
                {currency.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => selectCurrency(item.id)}
                    style={{
                      alignItems: 'flex-end',
                      paddingRight: 12,
                      marginTop: 8,
                    }}>
                    <Text style={[styles.secondaryText]}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <View style={styles.notificationContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.notificationText}>Notifications</Text>
                <Switch onValueChange={toggleSwitch} value={isEnabled} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },

  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  notificationContainer: {
    marginTop: 20,
    borderRadius: 180,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 150,
  },

  selectTypeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  secondaryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
});

export default Settings;

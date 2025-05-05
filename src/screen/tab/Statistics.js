import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar} from 'react-native-calendars';
import {useStore} from '../../store/context';
import {useNavigation} from '@react-navigation/native';

import CustomModal from '../../components/CustomModal';
import Layout from '../../components/Layout';
import Toast from 'react-native-toast-message';

const Statistics = () => {
  const [selecdedId, setSelectedId] = useState(1);
  const [state, setState] = useState({id: Date.now(), type: '', date: ''});
  const {saveReminders, sales, isEnabled} = useStore();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const totalEggsQuantity = sales
    .filter(sale => sale.type === 'Eggs')
    .reduce((total, sale) => {
      return total + Number(sale.quantity);
    }, 0);

  var d = new Date();
  var n = d.getDay();

  const dataArr = [0, 0, 0, 0, 0, 0];
  const filtered = dataArr.splice(n - 1, 0, totalEggsQuantity);

  console.log(filtered);

  const selectScreen = [
    {
      id: 1,
      title: 'Daily',
      selected: true,
    },
    {
      id: 2,
      title: 'Weekly',
      selected: false,
    },
    {
      id: 3,
      title: 'Monthly',
      selected: false,
    },
  ];
  useEffect(() => {
    setState(prev => ({
      ...prev,
      date: selectedDate,
    }));
  }, [toggleCalendar]);

  const isDisabled =
    state.selectedDate === '' || state.type === '' || state.date === '';

  const handleSaveReminder = () => {
    saveReminders(state);
    setSelectedDate('');
    setState({...state, type: '', date: ''});
    if (isEnabled) {
      Toast.show({
        text1: 'Reminder created successfully!',
      });
    }
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Statistics and Reminders</Text>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.sectionText}>Egg Production</Text>
          <View
            style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
            {selectScreen.map(screen => (
              <TouchableOpacity
                key={screen.id}
                onPress={() => setSelectedId(screen.id)}
                activeOpacity={0.7}
                style={styles.selectScreenContainer}>
                <Text style={styles.selectScreenText}>{screen.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {selecdedId === 1 && (
            <View>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                colors={['#FD579A', '#9A023A']}
                style={styles.linearGradient}>
                <Text style={styles.sectionHeaderText}>Collected today</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}>
                  <Image source={require('../../assets/images/eggs.png')} />
                  <Image
                    source={require('../../assets/images/chicken.png')}
                    style={{position: 'absolute', left: 40, top: -40}}
                  />

                  <Text style={styles.eggsQuantityText}>
                    {totalEggsQuantity}
                    {` `}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#fff',
                      }}>
                      Eggs
                    </Text>
                  </Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {selecdedId === 2 && (
            <View style={styles.container}>
              <LineChart
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [
                    {
                      data: dataArr,
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 20}
                height={220}
                // yAxisLabel="$"
                withShadow={true}
                withInnerLines={false}
                withOuterLines={false}
                withHorizontalLabels={false}
                // yAxisSuffix="k"
                yAxisInterval={3} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#FD579A',
                  backgroundGradientTo: '#FA5495',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  fillShadowGradientFrom: '#fff',
                  fillShadowGradientFromOpacity: 1,
                  fillShadowGradientTo: '#FA5495',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          )}

          {selecdedId === 3 && (
            <View style={styles.container}>
              <LineChart
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                  datasets: [
                    {
                      data: [0, 0, 0, totalEggsQuantity, 0, 0],
                    },
                  ],
                }}
                width={Dimensions.get('window').width - 20}
                height={220}
                // yAxisLabel="$"
                withShadow={true}
                withInnerLines={false}
                withOuterLines={false}
                withHorizontalLabels={false}
                // yAxisSuffix="k"
                yAxisInterval={3} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: '#FD579A',
                  backgroundGradientTo: '#FA5495',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  fillShadowGradientFrom: '#fff',
                  fillShadowGradientFromOpacity: 1,
                  fillShadowGradientTo: '#FA5495',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            </View>
          )}

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.setReminderContainer}>
              <Text style={styles.remindersText}>Set Reminders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RemindersHistory')}
              activeOpacity={0.7}
              style={styles.setReminderContainer}>
              <Text style={[styles.remindersText, {opacity: 0.5}]}>
                Reminders History
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={{marginHorizontal: 20}}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Type"
                  value={state.type}
                  maxLength={20}
                  placeholderTextColor="rgba(60, 60, 67, 0.6)"
                  onChangeText={value =>
                    setState(prev => ({
                      ...prev,
                      type: value,
                      id: Date.now(),
                    }))
                  }
                />
                <View>
                  <TextInput
                    style={[styles.input, {paddingLeft: 55}]}
                    onFocus={() => setToggleCalendar(true)}
                    placeholder="Date"
                    value={selectedDate}
                    showSoftInputOnFocus={true}
                    placeholderTextColor="rgba(60, 60, 67, 0.6)"
                  />
                  <Image
                    source={require('../../assets/icons/calendar.png')}
                    style={{position: 'absolute', left: 20, top: 19}}
                  />
                </View>
              </View>
            </View>
          </View>
          <View
            style={{alignItems: 'flex-end', marginTop: 10, marginBottom: 150}}>
            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => handleSaveReminder()}
              style={styles.headerBtn}
              activeOpacity={0.7}>
              <Image
                source={require('../../assets/icons/checked.png')}
                tintColor={isDisabled ? '#a9a9a9' : '#000'}
              />
            </TouchableOpacity>
          </View>
        </View>
        {toggleCalendar && (
          <CustomModal>
            <Calendar
              monthFormat="MMMM yyyy"
              showSixWeeks={true}
              // hideArrows={true}

              hideExtraDays={true}
              theme={{
                calendarBackground: 'transparent',
                textSectionTitleColor: '#FFFFFF80',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#ffffff',
                textDisabledColor: '#dd99ee',
                arrowColor: '#fff',
                indicatorColor: '#fff',
                dayTextColor: '#FFFFFF80',
                monthTextColor: '#FFFFFF',
                textMonthFontSize: 18,
                textMonthFontWeight: '600',
                textDayFontSize: 20,
                textDayFontWeight: '400',
                selectedDayBackgroundColor: '#FFC20E',
                selectedDayTextColor: 'rgba(255, 195, 14, 0.26)',
              }}
              onDayPress={day => {
                setSelectedDate(day.dateString);
                setToggleCalendar(false);
              }}
            />
          </CustomModal>
        )}
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
  eggsQuantityText: {
    fontSize: 60,
    fontWeight: '800',
    color: '#fff',
  },
  remindersText: {fontSize: 15, fontWeight: '600', color: '#fff'},
  sectionHeaderText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 45,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    marginBottom: 30,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  selectScreenContainer: {
    height: 30,
    paddingHorizontal: 12,
    backgroundColor: '#9C043C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  selectScreenText: {fontSize: 13, fontWeight: '600', color: '#fff'},
  linearGradient: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 15,
  },
  headerBtn: {
    width: 43,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setReminderContainer: {
    width: '49%',
    paddingVertical: 13,
    borderRadius: 30,
    marginTop: 15,
    backgroundColor: '#9C043C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingVertical: 11,
    borderRadius: 45,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 181,
    paddingLeft: 20,
    paddingRight: 20,
    height: 65,
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0)',
    elevation: 2,
  },
});

export default Statistics;

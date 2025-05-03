import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useStore} from '../../store/context';
import uuid from 'react-native-uuid';
import {Calendar} from 'react-native-calendars';
import CustomModal from '../../components/CustomModal';

const AddSale = () => {
  const [state, setState] = useState({
    id: Date.now(),
    salesDate: '',
    quantity: '',
    price: '',
    type: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [toggleCalendar, setToggleCalendar] = useState(false);

  console.log('selectedDate', selectedDate);

  const navigation = useNavigation();
  const {saveSales} = useStore();

  console.log('state', state);

  const handleNextStep = () => {
    // if (currentStep === 3) {
    //   saveData(state);
    // }
    // if (currentStep === 4) {
    //   //   saveData(state);
    //   navigation.navigate('TabNavigation');
    // } else {
    //   setCurrentStep(currentStep + 1);
    // }
    saveSales(state);

    setTimeout(() => {
      navigation.navigate('TabNavigation');
    }, 200);
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigation.goBack();
    }
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isDisabled =
    state.salesDate === '' ||
    state.quantity === '' ||
    state.price === '' ||
    state.type === '';

  return (
    <Layout>
      <ScrollView>
        <View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.headerBtn}
              activeOpacity={0.7}
              onPress={() => handlePreviousStep()}>
              <Image source={require('../../assets/icons/back.png')} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Add sales</Text>
            <TouchableOpacity
              disabled={isDisabled}
              onPress={() => handleNextStep()}
              style={styles.headerBtn}
              activeOpacity={0.7}>
              <Image
                source={require('../../assets/icons/checked.png')}
                tintColor={isDisabled ? '#a9a9a9' : '#000'}
              />
            </TouchableOpacity>
          </View>

          <View style={{marginHorizontal: 20, marginTop: 25}}>
            <View>
              <TextInput
                style={[styles.input, {paddingLeft: 55}]}
                value={selectedDate}
                onFocus={() => setToggleCalendar(true)}
                inputMode="numeric"
                placeholder="Sales Date"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                // onChangeText={value =>
                //   setState(prev => ({...prev, salesDate: value}))
                // }
              />
              <TextInput
                style={styles.input}
                value={state.quantity}
                placeholder="Quantity"
                inputMode="numeric"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, quantity: value}))
                }
              />
              <TextInput
                style={styles.input}
                value={state.price}
                placeholder="Price per Unit"
                inputMode="numeric"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, price: value}))
                }
              />
              <Image
                source={require('../../assets/icons/calendar.png')}
                style={{position: 'absolute', left: 20, top: 19}}
              />
            </View>
          </View>

          <View style={{marginHorizontal: 20}}>
            <Text style={styles.sectionText}>Product type</Text>

            <TouchableOpacity
              onPress={() =>
                setState(prev => ({
                  ...prev,
                  type: 'Eggs',
                  salesDate: selectedDate,
                }))
              }
              activeOpacity={0.7}
              style={[
                styles.selectTypeContainer,
                state.type === 'Eggs' && {
                  borderWidth: 7,
                  borderColor: '#9C043C',
                },
              ]}>
              <Text style={styles.selectTypeText}>Eggs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setState(prev => ({
                  ...prev,
                  type: 'Chickens',
                  salesDate: selectedDate,
                }))
              }
              style={[
                styles.selectTypeContainer,
                state.type === 'Chickens' && {
                  borderWidth: 7,
                  borderColor: '#9C043C',
                },
              ]}>
              <Text style={styles.selectTypeText}>Chickens</Text>
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
                textSectionTitleColor: '#ffffff',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#FFC20E',
                textDisabledColor: '#dd99ee',
                arrowColor: '#fff',
                indicatorColor: '#fff',
                dayTextColor: '#fff',
                monthTextColor: 'rgba(255, 255, 255, 0.5)',
                textMonthFontSize: 16,
                textMonthFontWeight: '700',
                textDayFontSize: 13,
                textDayFontWeight: '600',
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
  container: {},
  headerText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
  },
  sectionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBtn: {
    width: 43,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgPickerContainer: {
    width: 192,
    height: 192,
    backgroundColor: '#fff',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrap: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
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
  },
  loadedImg: {width: 192, height: 192, borderRadius: 99},
  selectTypeContainer: {
    backgroundColor: '#fff',
    borderRadius: 181,
    paddingLeft: 20,
    paddingRight: 20,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  selectTypeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
});

export default AddSale;

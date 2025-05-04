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
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from '../../store/context';
import uuid from 'react-native-uuid';
import {Calendar} from 'react-native-calendars';
import CustomModal from '../../components/CustomModal';

const AddChicken = () => {
  const [state, setState] = useState({
    id: uuid.v4(),
    name: '',
    breed: '',
    age: '',
    image: '',
    eggs: '',
    eggsDate: '',
    eventType: '',
    eventDate: '',
    additionalComments: '',
    notes: '',
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [changePhoto, setChangePhoto] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEventDate, setSelectedEventDate] = useState('');
  const [toggleCalendar, setToggleCalendar] = useState(false);

  const navigation = useNavigation();
  const {saveData} = useStore();

  console.log('state', state);

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 600,
      maxWidth: 600,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setState(prev => ({...prev, image: response.assets[0].uri}));
      setChangePhoto(true);
    });
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      // saveData(state);
    }
    if (currentStep === 4) {
      saveData(state);
      setSelectedDate(''), setSelectedEventDate('');
      setTimeout(() => {
        navigation.navigate('TabNavigation');
      }, 200);
    } else {
      setCurrentStep(currentStep + 1);
      setState(prev => ({
        ...prev,
        eggsDate: selectedDate,
        eventDate: selectedEventDate,
      }));
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 1) {
      navigation.goBack();
    }
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isDisabled1 =
    state.name === '' ||
    state.breed === '' ||
    state.age === '' ||
    state.image === '';

  const isDisabled2 = state.eggs === '' || selectedDate === '';

  const isDisabled3 =
    state.eventType === '' ||
    selectedEventDate === '' ||
    state.additionalComments === '';

  return (
    <Layout>
      <ScrollView>
        {currentStep === 1 && (
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.headerBtn}
                activeOpacity={0.7}
                onPress={() => handlePreviousStep()}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Add chicken</Text>
              <TouchableOpacity
                onPress={() => handleNextStep()}
                style={styles.headerBtn}
                activeOpacity={0.7}
                disabled={isDisabled1}>
                <Image
                  source={require('../../assets/icons/checked.png')}
                  tintColor={isDisabled1 ? '#a9a9a9' : '#000'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrap}>
              {changePhoto ? (
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => imagePicker()}
                  activeOpacity={0.7}>
                  <Image source={{uri: state.image}} style={styles.loadedImg} />
                  <Image
                    source={require('../../assets/icons/imgSkeleton.png')}
                    style={{position: 'absolute'}}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => imagePicker()}
                  style={styles.imgPickerContainer}
                  activeOpacity={0.7}>
                  <Image
                    source={require('../../assets/icons/imgSkeleton.png')}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                style={styles.input}
                value={state.name}
                maxLength={20}
                placeholder="Name"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, name: value}))
                }
              />
              <TextInput
                style={styles.input}
                value={state.breed}
                maxLength={20}
                placeholder="Breed"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, breed: value}))
                }
              />
              <TextInput
                style={styles.input}
                value={state.age}
                inputMode="numeric"
                maxLength={20}
                placeholder="Age"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, age: value}))
                }
              />
            </View>
          </View>
        )}

        {currentStep === 2 && (
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.headerBtn}
                activeOpacity={0.7}
                onPress={() => handlePreviousStep()}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Add chicken</Text>
              <TouchableOpacity
                onPress={() => handleNextStep()}
                style={styles.headerBtn}
                activeOpacity={0.7}
                disabled={isDisabled2}>
                <Image
                  source={require('../../assets/icons/checked.png')}
                  tintColor={isDisabled2 ? '#a9a9a9' : '#000'}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.sectionText}>Egg accounting</Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                style={styles.input}
                value={state.eggs}
                maxLength={20}
                placeholder="Number of Eggs Laid"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, eggs: value}))
                }
              />
              <View>
                <TextInput
                  style={[styles.input, {paddingLeft: 55}]}
                  value={selectedDate}
                  inputMode="numeric"
                  onFocus={() => setToggleCalendar(true)}
                  placeholder="Egg Collection Date"
                  placeholderTextColor="rgba(60, 60, 67, 0.6)"
                  onChangeText={value =>
                    setState(prev => ({...prev, eggsDate: value}))
                  }
                />
                <Image
                  source={require('../../assets/icons/calendar.png')}
                  style={{position: 'absolute', left: 20, top: 19}}
                />
              </View>
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.headerBtn}
                activeOpacity={0.7}
                onPress={() => handlePreviousStep()}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Add chicken</Text>
              <TouchableOpacity
                onPress={() => handleNextStep()}
                style={styles.headerBtn}
                activeOpacity={0.7}
                disabled={isDisabled3}>
                <Image
                  source={require('../../assets/icons/checked.png')}
                  tintColor={isDisabled3 ? '#a9a9a9' : '#000'}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.sectionText}>Add Events</Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                style={styles.input}
                value={state.eventType}
                maxLength={20}
                placeholder="Event Type"
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, eventType: value}))
                }
              />
              <View>
                <TextInput
                  style={[styles.input, {paddingLeft: 55}]}
                  value={selectedEventDate}
                  placeholder="Event Date"
                  onFocus={() => setToggleCalendar(true)}
                  inputMode="numeric"
                  placeholderTextColor="rgba(60, 60, 67, 0.6)"
                  onChangeText={value =>
                    setState(prev => ({...prev, eventDate: value}))
                  }
                />
                <Image
                  source={require('../../assets/icons/calendar.png')}
                  style={{position: 'absolute', left: 20, top: 19}}
                />
                <TextInput
                  textAlignVertical="top"
                  maxLength={20}
                  style={[
                    styles.input,
                    {height: 115, paddingTop: 20, borderRadius: 40},
                  ]}
                  value={state.additionalComments}
                  placeholder="Additional Comments"
                  placeholderTextColor="rgba(60, 60, 67, 0.6)"
                  onChangeText={value =>
                    setState(prev => ({...prev, additionalComments: value}))
                  }
                />
              </View>
            </View>
          </View>
        )}

        {currentStep === 4 && (
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.headerBtn}
                activeOpacity={0.7}
                onPress={() => handlePreviousStep()}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerText}>Add chicken</Text>
              <TouchableOpacity
                onPress={() => handleNextStep()}
                style={styles.headerBtn}
                activeOpacity={0.7}
                disabled={state.notes === ''}>
                <Image
                  source={require('../../assets/icons/checked.png')}
                  tintColor={state.notes === '' ? '#a9a9a9' : '#000'}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 20}}>
              <Text style={styles.sectionText}>Notes on Chicken Status</Text>
            </View>
            <View style={{marginHorizontal: 20}}>
              <TextInput
                textAlignVertical="top"
                style={[
                  styles.input,
                  {height: 115, paddingTop: 20, borderRadius: 40},
                ]}
                value={state.notes}
                maxLength={40}
                placeholder="Notes "
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={value =>
                  setState(prev => ({...prev, notes: value}))
                }
              />
            </View>
          </View>
        )}
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
                if (currentStep === 3) {
                  setSelectedEventDate(day.dateString);
                }
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
    fontWeight: '400',
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
});

export default AddChicken;

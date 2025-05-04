import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useStore} from '../../store/context';
import {Swipeable} from 'react-native-gesture-handler';

const RemindersHistory = () => {
  const navigation = useNavigation();
  const {reminders, getReminders, removeReminders} = useStore();

  console.log('reminders', reminders);

  useEffect(() => {
    getReminders();
  }, []);

  const handlePreviousStep = () => {
    navigation.goBack();
  };

  const deleteReminder = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeReminders(itemId)}>
        <Image source={require('../../assets/icons/delete.png')} />
      </TouchableOpacity>
    </View>
  );

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
            <Text style={styles.headerText}>Reminders History</Text>
          </View>

          {reminders.length === 0 ? (
            <View style={{alignItems: 'center', marginTop: 90}}>
              <Image
                source={require('../../assets/images/reminder.png')}
                style={styles.emptyRemindersImage}
              />
              <Text style={styles.emptyRemindersText}>
                You don't have anyone here..
              </Text>
            </View>
          ) : (
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <View style={{alignItems: 'center', marginBottom: 20}}>
                <Image source={require('../../assets/images/reminder.png')} />
              </View>

              <View>
                {reminders.map(reminder => (
                  <Swipeable
                    renderRightActions={() => deleteReminder(reminder.id)}
                    key={reminder.id}>
                    <View style={styles.reminderContainer}>
                      <Text style={styles.selectTypeText}>{reminder.type}</Text>
                      <Text style={styles.secondaryText}>{reminder.date}</Text>
                    </View>
                  </Swipeable>
                ))}
              </View>
            </View>
          )}
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
  emptyRemindersText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
  emptyRemindersImage: {
    width: 230,
    height: 230,
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    width: 43,
    height: 43,
    backgroundColor: '#fff',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '15%',
  },

  reminderContainer: {
    backgroundColor: '#fff',
    borderRadius: 181,
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
  },
  selectTypeText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  secondaryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
    opacity: 0.6,
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 7,
    marginLeft: 10,
  },
});

export default RemindersHistory;

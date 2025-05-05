import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import Layout from './Layout';
import {useStore} from '../store/context';
import CustomAlert from './CustomAlert';

const ChickenCard = ({route}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {removeChicken} = useStore();
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false);
  const chicken = route.params;

  const handleDeleteChicken = chicken => {
    removeChicken(chicken);
    setIsDisabled(true);

    setTimeout(() => {
      navigation.navigate('TabNavigation');
    }, 200);
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.headerBtn}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/back.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditChicken', chicken)}
            style={styles.headerBtn}
            activeOpacity={0.7}>
            <Image source={require('../assets/icons/pen.png')} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Image source={{uri: chicken.image}} style={styles.image} />
          <Text style={styles.sectionText}>{chicken.name}</Text>
          <View style={{marginBottom: 20}}>
            <Text style={styles.titleText}>Breed</Text>
            <Text style={styles.descriptionText}>{chicken.breed}</Text>
          </View>
          <View>
            <Text style={styles.titleText}>Age</Text>
            <Text style={styles.descriptionText}>{chicken.age}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionText}>Egg accounting</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={{marginBottom: 20}}>
              <Text style={styles.titleText}>Number of Eggs Laid</Text>
              <Text style={styles.descriptionText}>{chicken.eggs}</Text>
            </View>
            <Text style={styles.titleText}>Egg Collection Date</Text>
            <Text style={styles.descriptionText}>{chicken.eggsDate}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionText}>Events</Text>
          </View>

          <View style={styles.sectionContainer}>
            <View style={{marginBottom: 20}}>
              <Text style={styles.titleText}>Event Type</Text>
              <Text style={styles.descriptionText}>{chicken.eventType}</Text>
            </View>
            <View style={{marginBottom: 20}}>
              <Text style={styles.titleText}>Date</Text>
              <Text style={styles.descriptionText}>{chicken.eventDate}</Text>
            </View>
            <Text style={styles.titleText}>Additional Comments</Text>
            <Text style={styles.descriptionText}>
              {chicken.additionalComments}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sectionText}>Notes on Chicken Status</Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.titleText}>Notes</Text>
            <Text style={styles.descriptionText}>{chicken.notes}</Text>
          </View>
        </View>
        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.7}
            style={styles.deleteBtn}
            onPress={() => setShowAlert(true)}>
            <Image source={require('../assets/icons/delete.png')} />
          </TouchableOpacity>
        </View>

        {showAlert && (
          <CustomAlert>
            <Text style={styles.alertTitle}>Delete</Text>
            <Text style={styles.alertSecondaryText}>
              Are you sure you want to delete this?
            </Text>
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: '#fff',
              }}></View>
            <View style={{paddingHorizontal: '20%'}}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleDeleteChicken(chicken.id)}>
                  <Text
                    style={[
                      styles.alertTitle,
                      {marginTop: 10, marginBottom: 20, marginRight: 25},
                    ]}>
                    Yes
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    height: '100%',
                    width: 1,
                    backgroundColor: '#fff',
                  }}></View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowAlert(false)}>
                  <Text
                    style={[
                      styles.alertTitle,
                      {marginTop: 10, marginBottom: 20},
                    ]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </CustomAlert>
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
  },
  sectionText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    marginTop: 25,
    marginBottom: 20,
  },
  alertTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  alertSecondaryText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
    opacity: 0.6,
    fontWeight: '400',
    color: '#fff',
    // marginTop: 20,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    // marginTop: 20,
    // marginBottom: 20,
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
  image: {
    width: '100%',
    height: 240,
    borderTopRightRadius: 120,
    borderTopLeftRadius: 33,
  },
  sectionContainer: {
    width: '100%',
    padding: 20,
    paddingVertical: 30,
    backgroundColor: '#9C043C',
    borderRadius: 35,
  },
  deleteBtn: {
    width: 73,
    height: 73,
    backgroundColor: '#E82200',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnWrap: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
});

export default ChickenCard;

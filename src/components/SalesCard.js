import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useStore} from '../store/context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import Layout from './Layout';
import CustomAlert from './CustomAlert';

const SalesCard = ({route}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const {removeSale, currency} = useStore();
  const navigation = useNavigation();
  const chicken = route.params;

  const handleDeleteSale = sale => {
    removeSale(sale);
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
            onPress={() => navigation.navigate('EditSale', chicken)}
            style={styles.headerBtn}
            activeOpacity={0.7}>
            <Image source={require('../assets/icons/pen.png')} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text style={styles.sectionText}>{chicken.type}</Text>
          <View style={{marginBottom: 20}}>
            <Text style={styles.titleText}>Sale date</Text>
            <Text style={styles.descriptionText}>{chicken.salesDate}</Text>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={styles.titleText}>Quantity</Text>
            <Text style={styles.descriptionText}>{chicken.quantity}</Text>
          </View>
          <View>
            <Text style={styles.titleText}>Price per Unit</Text>
            <Text style={styles.descriptionText}>{chicken.price}</Text>
          </View>

          <View style={styles.totalEarnedContainer}>
            <Text style={styles.earnedText}>Total earned</Text>
            {currency.map(item => {
              if (item.id === 1 && item.selected) {
                return (
                  <Text style={styles.quantityText} key={item.id}>
                    ${chicken.quantity * chicken.price}
                  </Text>
                );
              } else if (item.id === 2 && item.selected) {
                return (
                  <Text style={styles.quantityText} key={item.id}>
                    ₽ {chicken.quantity * chicken.price}
                  </Text>
                );
              } else if (item.id === 3 && item.selected) {
                return (
                  <Text style={styles.quantityText} key={item.id}>
                    € {chicken.quantity * chicken.price}
                  </Text>
                );
              }
            })}
          </View>
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
                  onPress={() => handleDeleteSale(chicken.id)}>
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
      <View style={{alignItems: 'center'}}>
        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.7}
            style={styles.deleteBtn}
            onPress={() => setShowAlert(true)}>
            <Image source={require('../assets/icons/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  totalEarnedContainer: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#9C043C',
    borderRadius: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 150,
  },
  earnedText: {fontSize: 18, color: '#fff', fontWeight: '500', opacity: 0.7},
  quantityText: {fontSize: 40, color: '#fff', fontWeight: '500'},
  sectionText: {
    fontSize: 25,
    fontWeight: '800',
    color: '#fff',
    marginTop: 25,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 16,
    opacity: 0.6,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 5,
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
  descriptionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
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

  deleteBtn: {
    width: 73,
    height: 73,
    backgroundColor: '#E82200',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtnWrap: {
    position: 'absolute',
    bottom: 40,
  },
});

export default SalesCard;

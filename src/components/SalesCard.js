import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from './Layout';
import {useStore} from '../store/context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const SalesCard = ({route}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {removeSale} = useStore();
  const navigation = useNavigation();
  const chicken = route.params;

  const handleDeleteSale = sale => {
    removeSale(sale);
    setIsDisabled(true);

    setTimeout(() => {
      navigation.navigate('TabNavigation');
    }, 400);
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
            onPress={() => handleNextStep()}
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
            <Text style={styles.quantityText}> $1000</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{alignItems: 'center'}}>
        <View style={styles.deleteBtnWrap}>
          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.7}
            style={styles.deleteBtn}
            onPress={() => handleDeleteSale(chicken.id)}>
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

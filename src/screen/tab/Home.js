import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import Layout from '../../components/Layout';
import {useStore} from '../../store/context';

const Home = () => {
  const {
    getData,
    formData,
    removeChicken,
    sales,
    getSales,
    removeSale,
    currency,
  } = useStore();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const totalEarned = sales.reduce((total, sale) => {
    return total + Number(sale.quantity) * Number(sale.price);
  }, 0);

  useEffect(() => {
    getData();
    getSales();
  }, [isFocused]);

  const emptyData = formData.length === 0;

  const deleteChicken = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeChicken(itemId)}>
        <Image source={require('../../assets/icons/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  const deleteSale = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeSale(itemId)}>
        <Image source={require('../../assets/icons/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {emptyData ? 'My chicken' : 'Home'}
          </Text>

          {emptyData && (
            <View
              style={{alignItems: 'center', marginTop: 60, marginBottom: 150}}>
              <Image source={require('../../assets/images/emptyHome.png')} />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.addBtnEmpty}
                onPress={() => navigation.navigate('AddChicken')}>
                <Image source={require('../../assets/icons/add.png')} />
              </TouchableOpacity>
            </View>
          )}

          {!emptyData && <Text style={styles.sectionText}>Chickens</Text>}
        </View>
        <View>
          {!emptyData && (
            <View>
              <View style={styles.listContainer}>
                {formData.map(item => (
                  <Swipeable
                    renderRightActions={() => deleteChicken(item.id)}
                    key={item.id}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => navigation.navigate('ChickenCard', item)}
                      style={styles.itemContainer}
                      key={item.id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{width: 115, height: 115, borderRadius: 99}}
                        />
                        <Text style={styles.itemText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </Swipeable>
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.addBtn}
                onPress={() => navigation.navigate('AddChicken')}>
                <Image source={require('../../assets/icons/add.png')} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!emptyData && (
          <View style={{marginBottom: 200}}>
            <View style={{marginHorizontal: 20}}>
              <View style={{marginHorizontal: 20, marginTop: 105}}>
                <Text style={styles.sectionText}>Add sales</Text>
              </View>
              <View style={styles.totalEarnedContainer}>
                <Text style={styles.earnedText}>Total earned</Text>
                {currency.map(item => {
                  if (item.id === 1 && item.selected) {
                    return (
                      <Text style={styles.quantityText} key={item.id}>
                        ${totalEarned}
                      </Text>
                    );
                  } else if (item.id === 2 && item.selected) {
                    return (
                      <Text style={styles.quantityText} key={item.id}>
                        ₽{totalEarned}
                      </Text>
                    );
                  } else if (item.id === 3 && item.selected) {
                    return (
                      <Text style={styles.quantityText} key={item.id}>
                        €{totalEarned}
                      </Text>
                    );
                  }
                })}
              </View>
            </View>

            <View style={[styles.listContainer, {paddingHorizontal: 0}]}>
              {sales.map(item => (
                <Swipeable
                  renderRightActions={() => deleteSale(item.id)}
                  key={item.id}>
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('SalesCard', item)}
                    style={styles.itemContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={styles.itemText}>{item.type}</Text>
                      <Text style={styles.priceText}>
                        $ {item.quantity * item.price}
                      </Text>
                    </View>
                    <Text style={styles.salesDateText}>{item.salesDate}</Text>
                  </TouchableOpacity>
                </Swipeable>
              ))}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.addSalesBtn}
              onPress={() => navigation.navigate('AddSale')}>
              <Image source={require('../../assets/icons/add.png')} />
            </TouchableOpacity>
          </View>
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
  sectionText: {fontSize: 16, fontWeight: '400', color: '#fff', marginTop: 20},
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
  },
  listContainer: {
    marginTop: 20,
    paddingRight: 20,
  },
  list: {
    paddingBottom: 30,
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 27,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginBottom: 10,
    borderRadius: 38,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
  priceText: {fontSize: 17, fontWeight: '800', color: '#9C043C'},
  salesDateText: {
    fontSize: 11,
    color: '#000000',
    fontWeight: '700',
    opacity: 0.7,
    marginLeft: 16,
    marginTop: 15,
  },
  earnedText: {fontSize: 18, color: '#fff', fontWeight: '500', opacity: 0.7},
  quantityText: {fontSize: 40, color: '#fff', fontWeight: '500'},
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 7,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addBtn: {
    width: 74,
    height: 74,
    borderRadius: 99,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -75,
    right: 20,
  },
  addSalesBtn: {
    width: 74,
    height: 74,
    borderRadius: 99,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: -80,
  },
  addBtnEmpty: {
    width: 74,
    height: 74,
    borderRadius: 99,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
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
});

export default Home;

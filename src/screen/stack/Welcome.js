import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Layout from '../../components/Layout';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <Layout>
      <View style={styles.container}>
        <Image source={require('../../assets/images/loader.png')} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('TabNavigation')}
          style={styles.startBtn}>
          <Image source={require('../../assets/icons/startArr.png')} />
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtn: {
    width: 82,
    height: 82,
    borderRadius: 99,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
});

export default Welcome;

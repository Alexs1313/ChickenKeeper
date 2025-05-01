import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {recommendations} from '../../data/recommendations';

import RecCard from '../../components/RecCard';

const Rec = () => {
  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Recommendations</Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 25, marginBottom: 25}}>
          <Image source={require('../../assets/images/recMain.png')} />
        </View>

        <View style={{marginHorizontal: 20, gap: 5, marginBottom: 120}}>
          {recommendations.map(rec => (
            <RecCard rec={rec} key={rec.id} />
          ))}
        </View>
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
    textAlign: 'center',
  },
  headerContainer: {
    marginHorizontal: 20,
    marginTop: 80,
  },
});

export default Rec;

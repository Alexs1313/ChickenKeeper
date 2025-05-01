import {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';

const RecCard = ({rec}) => {
  const [showDescriptions, setShowDescriptions] = useState(false);

  return (
    <View>
      <View style={styles.recContainer} key={rec.id}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{width: 300}}>
            <Text style={styles.recTitle}>{rec.title}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setShowDescriptions(!showDescriptions)}>
            {showDescriptions ? (
              <Image source={require('../assets/icons/hideDetails.png')} />
            ) : (
              <Image source={require('../assets/icons/details.png')} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {showDescriptions && (
        <View>
          <Text style={styles.recDescription}>{rec.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recContainer: {
    paddingVertical: 12,
    paddingLeft: 13,
    paddingRight: 20,
    height: 66,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
  },
  recTitle: {fontSize: 16, fontWeight: '700'},
  recDescription: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginTop: 5,
    marginBottom: 12,
  },
});

export default RecCard;

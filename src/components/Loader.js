import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import Layout from '../components/Layout';

const Loader = () => {
  const firstImageOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loopAnimation();
  }, [firstImageOpacity]);

  const loopAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(firstImageOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),

      Animated.parallel([
        Animated.timing(firstImageOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => loopAnimation());
  };

  return (
    <Layout>
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/images/loader.png')}
          style={{opacity: firstImageOpacity}}
        />
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
});

export default Loader;

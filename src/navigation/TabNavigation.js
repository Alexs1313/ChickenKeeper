import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, Vibration, View} from 'react-native';
import Home from '../screen/tab/Home';
import Rec from '../screen/tab/Rec';
import Statistics from '../screen/tab/Statistics';
import Settings from '../screen/tab/Settings';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#999999',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#FD579A', '#9A023A']}
                  style={styles.bgIcon}>
                  <Image
                    source={require('../assets/tab/home.png')}
                    style={{tintColor: color}}
                  />
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.bgIcon}>
                <Image
                  source={require('../assets/tab/home.png')}
                  style={{tintColor: color}}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Rec"
        component={Rec}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#FD579A', '#9A023A']}
                  style={styles.bgIcon}>
                  <Image
                    source={require('../assets/tab/recomendation.png')}
                    style={{tintColor: color}}
                  />
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.bgIcon}>
                <Image
                  source={require('../assets/tab/recomendation.png')}
                  style={{tintColor: color}}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#FD579A', '#9A023A']}
                  style={styles.bgIcon}>
                  <Image
                    source={require('../assets/tab/statistics.png')}
                    style={{tintColor: color}}
                  />
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.bgIcon}>
                <Image
                  source={require('../assets/tab/statistics.png')}
                  style={{tintColor: color}}
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, focused}) =>
            focused ? (
              <View>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0, y: 1}}
                  colors={['#FD579A', '#9A023A']}
                  style={styles.bgIcon}>
                  <Image
                    source={require('../assets/tab/settings.png')}
                    style={{tintColor: color}}
                  />
                </LinearGradient>
              </View>
            ) : (
              <View style={styles.bgIcon}>
                <Image
                  source={require('../assets/tab/settings.png')}
                  style={{tintColor: color}}
                />
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#141414',
    height: 72,
    paddingBottom: 3,
    paddingTop: 16.5,
    position: 'absolute',
    bottom: 34,
    marginHorizontal: 59,
    borderRadius: 252,
  },
  tabBarLabelStyle: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
  },
  bgIcon: {
    backgroundColor: 'transparent',
    width: 65,
    height: 65,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabNavigation;

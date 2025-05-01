import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Layout = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#FD579A', '#9A023A']}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Layout;

import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';

import {useEffect, useState} from 'react';

import StackNavigation from './src/navigation/StackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Home from './src/screen/tab/Home';
import {StoreProvider} from './src/store/context';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>
        <GestureHandlerRootView style={{flex: 1}}>
          <StackNavigation />
        </GestureHandlerRootView>
      </StoreProvider>
      {/* {loader ? <StackNavigation /> : <Loader />} */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;

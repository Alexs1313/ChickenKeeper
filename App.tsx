import {NavigationContainer} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import StackNavigation from './src/navigation/StackNavigation';
import {StoreProvider} from './src/store/context';
import Loader from './src/components/Loader';
import Toast from 'react-native-toast-message';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>
        <GestureHandlerRootView>
          {loader ? <StackNavigation /> : <Loader />}
          <Toast position="top" topOffset={50} />
        </GestureHandlerRootView>
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;

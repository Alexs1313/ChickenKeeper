import {createStackNavigator} from '@react-navigation/stack';

import TabNavigation from './TabNavigation';
import AddChicken from '../screen/stack/AddChicken';
import Welcome from '../screen/stack/Welcome';
import Home from '../screen/tab/Home';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="AddChicken" component={AddChicken} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

import {createStackNavigator} from '@react-navigation/stack';

import TabNavigation from './TabNavigation';
import AddChicken from '../screen/stack/AddChicken';
import Welcome from '../screen/stack/Welcome';
import Home from '../screen/tab/Home';
import ChickenCard from '../components/ChickenCard';
import AddSale from '../screen/stack/AddSale';
import SalesCard from '../components/SalesCard';
import RemindersHistory from '../screen/stack/RemindersHistory';
import EditSale from '../screen/stack/EditSale';
import EditChicken from '../screen/stack/EditChicken';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
      <Stack.Screen name="AddChicken" component={AddChicken} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChickenCard" component={ChickenCard} />
      <Stack.Screen name="AddSale" component={AddSale} />
      <Stack.Screen name="SalesCard" component={SalesCard} />
      <Stack.Screen name="RemindersHistory" component={RemindersHistory} />
      <Stack.Screen name="EditSale" component={EditSale} />
      <Stack.Screen name="EditChicken" component={EditChicken} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

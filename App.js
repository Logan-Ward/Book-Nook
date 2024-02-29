import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Home from './views/Home';
import Map from './views/Map';
import Search from './views/Search';
import Bookmarks from './views/Bookmarks';
import Auth from './views/Auth';
import Location from './components/Location';
import Nav from './components/Nav';
import CreateLoc from './views/CreateLoc';

const Stack = createNativeStackNavigator();
// TODO: If user is signed in and navigates to the Bookmarks/CreateLoc page then signs out, 
// they will still be able to access the bookmarks page if they use the back 
// functionality of their device. Fix it.

// TODO: If user navigates to a modal view then uses the navigate button to go elsewhere, 
// the back button does not go back to the view before the modal, it closes the app cuz there
// is no nav history. Fix it.

// TODO: Make the help modal

// TODO: Bring in icons and images before showing off

// TODO: Add back button to modals

// TODO: Add a settings screen after everything else

// TODO: Figure out fonts way later -_-

// TODO: These elements aren't going to animate themselves

export default function App() {
  
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Group>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='Search' component={Search} />
          <Stack.Screen name='Bookmarks' component={Bookmarks} />
          <Stack.Screen name='Auth' component={Auth} />
          <Stack.Screen name='CreateLoc' component={CreateLoc} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen name='Location' component={Location} />
          <Stack.Screen name='Nav' component={Nav} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e4ceb8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { StyleSheet, View, Button, TextInput, Pressable, Text } from 'react-native';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

// TODO: Setup filters and address center
// TODO: Implement center on user location button

export default function Settings({ navigation }) {
  
  const [nooks, setNooks] = useState([]);
  
  return (
    <>
    <View style={styles.container}>
          <Pressable
            style={[styles.button]}
            onPress={async () => {await supabase.auth.signOut(); navigation.navigate('Home')}}
            ><Text style={styles.buttonText}>Logout</Text></Pressable>
    </View>
    <HomeButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 85,
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9b0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 30,
  },
  filters: {
    flex: 10,
    flexDirection: 'row',
  },
  filter: {
    fontWeight: 'bold',
  },
  map: {
    flex: 80,
    width: '100%',
    height: '100%',
    backgroundColor: 'turquoise'
  },
});

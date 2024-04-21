import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { Montserrat_400Regular, useFonts } from '@expo-google-fonts/montserrat'
import supabase from '../lib/supabase';

export default function Home({ navigation }) {

  const [user, setUser] = useState(false);

  useEffect(() => {
    (async () => {
      const results = await supabase.auth.getSession();
      setUser(results.data.session ? true : false);
    })();
    supabase.auth.onAuthStateChange((event, session) => {
      setTimeout(async () => {
        if (event === 'SIGNED_OUT') {
          setUser(false);
        } else if (event === 'SIGNED_IN') {
          setUser(true);
        }
      }, 0);
    });
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  // TODO: Wrap the book and nook lines in an svg bookmark

  return (
    <View style={styles.container}>
      <Text style={styles.title1}>book</Text>
      <Text style={styles.title2}>nook</Text>
      <Pressable
        style={[styles.buttonMap, styles.button]}
        onPress={() => navigation.navigate('Map')}
        ><Text style={styles.buttonText}>Map</Text></Pressable>
      <Pressable
        style={[styles.buttonSearch, styles.button]}
        onPress={() => navigation.navigate('Search')}
        ><Text style={styles.buttonText}>Search</Text></Pressable>
      {user ? (
        <>
        <Pressable
          style={[styles.buttonCreate, styles.button]}
          onPress={() => navigation.navigate('CreateLoc')}
          ><Text style={styles.buttonText}>New Location</Text></Pressable>
          <Pressable
            style={[styles.buttonBookM, styles.button]}
            onPress={() => navigation.navigate('Bookmarks')}
            ><Text style={styles.buttonText}>Bookmarks</Text></Pressable>
          <Pressable
            style={[styles.buttonSettings, styles.button]}
            onPress={() => navigation.navigate('Settings')}
            ><Text style={styles.buttonText}>Settings</Text></Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={[styles.buttonSettings, styles.button]}
            onPress={() => navigation.navigate('Auth')}
            ><Text style={styles.buttonText}>Login/Signup</Text></Pressable>
        </>
      )}
      <Pressable
        style={styles.buttonQuestion}
        onPress={() => navigation.navigate('Help')}
      ><Text style={styles.buttonText}>?</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#e4ceb8',
    width: '100%',
    height: '100%',
  },
  title1: {
    position: 'absolute',
    fontSize: 50,
    top: '5%',
    left: '15%',
    fontFamily: 'Montserrat_400Regular'
  },
  title2: {
    position: 'absolute',
    fontSize: 50,
    top: '14%',
    left: '45%',
    fontFamily: 'Montserrat_400Regular'
  },
  button: {
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'Montserrat_400Regular'
  },
  buttonSearch: {
    top: '28%',
    left: '15%',
  },
  buttonCreate: {
    top: '42%',
    left: '30%',
  },
  buttonMap: {
    top: '56%',
    left: '74%',
  },
  buttonBookM: {
    top: '70%',
    left: '30%',
  },
  buttonSettings: {
    position: 'absolute',
    top: '84%',
    left: '15%',
  },
  buttonLogin: {
    top: '90%',
    left: '8%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  buttonQuestion: {
    position: 'absolute',
    top: '5%',
    left: '83%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 12,
  },
});

import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
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
          ><Text style={styles.buttonText}>Create Location</Text></Pressable>
          <Pressable
            style={[styles.buttonBookM, styles.button]}
            onPress={() => navigation.navigate('Bookmarks')}
            ><Text style={styles.buttonText}>Bookmarks</Text></Pressable>
          <Pressable
            style={[styles.buttonSettings, styles.button]}
            onPress={() => navigation.navigate('Settings')}
            ><Text style={styles.buttonText}>Settings</Text></Pressable>
          <Pressable
            style={[styles.buttonLogout, styles.button]}
            onPress={() => supabase.auth.signOut()}
            ><Text style={styles.buttonText}>Logout</Text></Pressable>
        </>
      ) : (
        <>
          <Pressable
            style={[styles.buttonLogin, styles.button]}
            onPress={() => navigation.navigate('Auth')}
            ><Text style={styles.buttonText}>Login/Signup</Text></Pressable>
          <Pressable
            style={[styles.buttonSettings, styles.button]}
            onPress={() => navigation.navigate('Settings')}
            ><Text style={styles.buttonText}>Settings</Text></Pressable>
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
    fontWeight: 'bold',
    fontSize: 35,
    top: '8%',
    left: '15%',
  },
  title2: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 35,
    top: '15%',
    left: '37%',
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
    fontWeight: 'bold',
  },
  buttonSearch: {
    top: '30%',
    left: '15%',
  },
  buttonMap: {
    top: '50%',
    left: '74%',
  },
  buttonCreate: {
    top: '40%',
    left: '30%',
  },
  buttonBookM: {
    top: '60%',
    left: '30%',
  },
  buttonSettings: {
    position: 'absolute',
    top: '70%',
    left: '15%',
  },
  buttonLogin: {
    top: '90%',
    left: '10%',
  },
  buttonLogout: {
    top: '90%',
    left: '11%',
  },
  buttonQuestion: {
    position: 'absolute',
    top: '8%',
    left: '85%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 12,
  },
});

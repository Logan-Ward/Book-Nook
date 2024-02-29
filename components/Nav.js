import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import HomeButton from '../components/HomeButton';

// TODO: Get the Bookmarks and Create Location routes conditionally rendered in
// here based on whether user is logged in

export default function Nav() {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Pressable
          style={[styles.button, styles.buttonHome]}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonMap]}
          onPress={() => {
            navigation.navigate('Map');
          }}
        >
          <Text style={styles.buttonText}>Map</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSearch]}
          onPress={() => {
            navigation.navigate('Search');
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonSettings]}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </Pressable>
      </View>
      <HomeButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 85,
    backgroundColor: '#e4ceb8',
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
    fontWeight: 'bold',
    fontSize: 20,
  },
  buttonHome: {
    position: 'absolute',
    top: '75%',
    left: '70%',
  },
  buttonMap: {
    position: 'absolute',
    top: '65%',
    left: '10%',
  },
  buttonSearch: {
    position: 'absolute',
    top: '55%',
    left: '70%',
  },
  buttonSettings: {
    position: 'absolute',
    top: '45%',
    left: '10%',
  },
});

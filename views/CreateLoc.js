import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Linking,
  ScrollView,
  Pressable,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Animated,
  MarkerAnimated,
} from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

// TODO: Location permissions gonna need finetuning
// TODO: Make all the fields required and whatnot
// TODO: Expand functionality of description/directions fields to accept inline images

export default function CreateLoc() {
  const navigation = useNavigation();
  const [foreground, requestForeground] = useForegroundPermissions();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [directions, setDirections] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
    pitch: 0,
    heading: 0,
    zoom: 0,
    center: {
      latitude: 0,
      longitude: 0,
    }
  });
  const camera = useRef(null);

  useEffect(() => {
    camera.current.animateCamera({ center: position }, 500);
  }, [position]);

  async function createLocation() {
    let res4 = await supabase.auth.getUser();
    const location = {
      title,
      description,
      directions,
      created_by: res4.data.user.id,
      location: position,
    };
    let res = await supabase.from('nooks').insert(location);
  }

  async function centerLocation() {
    if (foreground.status === 'denied') {
      Linking.openSettings();
      return;
    }
    let { status } = await requestForeground();
    if (status !== 'granted') {
      return;
    }

    let location = await getCurrentPositionAsync({});
    setPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0,
      longitudeDelta: 0,
      pitch: 0,
      heading: 0,
      zoom: 0,
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
    });
  }

  // TODO: Verify that zoom works with touch controls as intended.

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Create Location</Text>
        <View style={styles.scrollWrapper}>
          <ScrollView style={styles.scrollSection} contentContainerStyle={styles.scrollLayout}>
            <TextInput
              style={styles.input}
              onChangeText={(v) => setTitle(v)}
              placeholder='Title'
            />
            <TextInput
              style={styles.input}
              onChangeText={(v) => setDescription(v)}
              placeholder='Description'
            />
            <TextInput
              style={styles.input}
              onChangeText={(v) => setDirections(v)}
              placeholder='Directions'
              multiline
            />
            <Pressable style={styles.buttonCenter} onPress={centerLocation}>
              <Text style={styles.buttonText}>Center On Self</Text>
            </Pressable>
            <Animated
              onPress={(v) =>
                setPosition({
                  latitude: v.nativeEvent.coordinate.latitude,
                  longitude: v.nativeEvent.coordinate.longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0,
                  pitch: 0,
                  heading: 0,
                  zoom: 0,
                  center: {
                    latitude: v.nativeEvent.coordinate.latitude,
                    longitude: v.nativeEvent.coordinate.longitude,
                  }
                })
              }
              ref={camera}
              camera={position}
              style={styles.map}
              provider={PROVIDER_GOOGLE}
            >
              <MarkerAnimated coordinate={position} />
            </Animated>
            <Pressable style={styles.buttonCreate} onPress={createLocation}>
              <Text style={styles.buttonText}>Create</Text>
            </Pressable>
          </ScrollView>
        </View>
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
  title: {
    flex: 10,
    fontSize: 30,
    marginBottom: 0,
    backgroundColor: '#832705',
    color: 'white',
    paddingTop: 40,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
  scrollWrapper: {
    flex: 80,
    height: '100%',
  }, 
  scrollSection: {
    width: '100%',
    paddingHorizontal: 20,
  },
  scrollLayout: {
    alignItems: 'center'
  },
  buttonCreate: {
    flex: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
    marginBottom: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 0,
    width: 300,
  },
  buttonCenter: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  map: {
    flex: 80,
    width: '90%',
    height: 400,
    backgroundColor: 'turquoise',
    borderColor: 'black',
    borderWidth: 2,
    marginBottom: 10,
  },
});

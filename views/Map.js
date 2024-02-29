import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

// TODO: Setup filters and address center
// TODO: Implement center on user location button

export default function Map({ navigation }) {
  
  const [nooks, setNooks] = useState([]);
  
  useEffect(() => {
    (async() => {
      let res = await supabase.from('nooks').select('*');
      setNooks(res.data);
    })();
  }, []);
  
  function openLocation (n) {
    navigation.navigate('Location', {location: n});
  }
  
  return (
    <>
    <View style={styles.container}>
      <TextInput style={styles.address} placeholder='Center on Address' />
      <View style={styles.filters}>
        <Button
          style={styles.filter}
          title='Filter 1'
          onPress={() => console.log('Map')}
        />
        <Button
          style={styles.filter}
          title='Filter 2'
          onPress={() => console.log('Search')}
        />
        <Button
          style={styles.filter}
          title='Filter 3'
          onPress={() => console.log('Bookmarks')}
        />
        <Button
          style={styles.filter}
          title='Filter 4'
          onPress={() => console.log('Settings')}
        />
        <Button
          style={styles.filter}
          title='Filter 5'
          onPress={() => console.log('Help')}
        />
      </View>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map}>
        {nooks.map((n, i) => (<Marker key={i} coordinate={n.location}><Callout onPress={() => openLocation(n)}><Text>{n.title}</Text><Text>{n.description}</Text></Callout></Marker>))}
      </MapView>
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
  address: {
    flex: 10,
    width: '100%'
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

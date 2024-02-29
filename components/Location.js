import { StyleSheet, View, ScrollView, Text } from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Animated,
} from 'react-native-maps';

import { useEffect } from 'react';

// TODO: Add navigate functionality
// TODO: Add bookmarking functionality

export default function Location({route, navigation}) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.location.title}</Text>
      <View style={styles.location}>
        <ScrollView>
          <Text style={styles.description}>{route.params.location.description}</Text>
          <Text style={styles.directions}>{route.params.location.directions}</Text>
          <MapView
            region={{...route.params.location.location, latitudeDelta: .1, longitudeDelta: .1}}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker tappable={false} coordinate={route.params.location.location} />
          </MapView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 85,
    backgroundColor: '#d9d9b0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 10,
    fontSize: 30,
  },
  location: {
    flex: 80,
    width: '100%',
    height: '100%',
    backgroundColor: '#52b07b',
    padding: '10%'
  },
  description: {
  },
  directions: {
  },
  map: {
    width: '100%',
    height: 400,
  },
});

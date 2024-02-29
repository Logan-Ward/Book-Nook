import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable, Text } from 'react-native';

// TODO: Clean up Nav button edge cases and functionality

export default function HomeButton() {
  const navigation = useNavigation();

  return (
        <Pressable
          style={styles.homePressable}
          onPress={() => {
            let routes = navigation.getState().routes
            if (routes[routes.length - 1].name === 'Nav') {
              navigation.goBack();
            } else {
              navigation.navigate('Nav');
            }
          }}
        ><Text style={styles.text}>Navigate</Text></Pressable>
  );
}

const styles = StyleSheet.create({
  homePressable: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    borderTopWidth: 1,
    borderTopColor: 'black',
    minHeight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

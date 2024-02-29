import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

// TODO: Maybe add search/filter functionalities to this list

export default function Bookmarks({ navigation }) {
  const [bookmarks, setBookmarks] = useState([]);
  
  useEffect(() => {
    (async () => {
      let { data: {user: {id}} } = await supabase.auth.getUser();
      let { data } = await supabase.from('nooks').select('*').eq('created_by', id);
      setBookmarks(data)
    })()
  }, []);

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title} >Bookmarks</Text>
      <View style={styles.bookmarks}>
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => (
            <Text
              style={styles.bookmark}
              key={Math.random().toString(12).substring(0)}
              onPress={() => navigation.navigate('Location', {location: item})}
            >
              {item.title} : {item.description}
            </Text>
          )}
        />
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
  },
  bookmarks: {
    flex: 80,
    width: '100%',
    height: '100%',
  },
  bookmark: {
    fontSize: 15,
    marginTop: 18,
    backgroundColor: '#832705',
    padding: 10,
    color: 'white',
    marginHorizontal: 10,
  },
});

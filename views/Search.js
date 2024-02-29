import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

// TODO: Setup filters

export default function Search({ navigation }) {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  async function search() {
    let res = await supabase
      .from('nooks')
      .select()
      .ilike('title', `%${query}%`);
    setResults(res.data);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            onChangeText={setQuery}
            style={styles.search}
            placeholder='search'
          />
          <Pressable style={styles.searchButton} onPress={search}>
            <Text style={styles.searchText}>Search</Text>
          </Pressable>
        </View>
        <View style={styles.filters}>
          <Pressable
            style={styles.filter}
            onPress={() => console.log('Filter 1')}
          >
            <Text style={styles.filterText}>Filter 1</Text>
          </Pressable>
          <Pressable
            style={styles.filter}
            onPress={() => console.log('Filter 2')}
          >
            <Text style={styles.filterText}>Filter 2</Text>
          </Pressable>
          <Pressable
            style={styles.filter}
            onPress={() => console.log('Filter 3')}
          >
            <Text style={styles.filterText}>Filter 3</Text>
          </Pressable>
          <Pressable
            style={styles.filter}
            onPress={() => console.log('Filter 4')}
          >
            <Text style={styles.filterText}>Filter 4</Text>
          </Pressable>
          <Pressable
            style={styles.filter}
            onPress={() => console.log('Filter 5')}
          >
            <Text style={styles.filterText}>Filter 5</Text>
          </Pressable>
        </View>
        <View style={styles.results}>
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <Text
                style={styles.result}
                key={Math.random().toString(12).substring(0)}
                onPress={() =>
                  navigation.navigate('Location', { location: item })
                }
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
  searchBar: {
    flex: 20,
  },
  search: {
    flex: 10,
  },
  searchButton: {},
  searchText: {},
  filters: {
    flex: 10,
    flexDirection: 'row',
  },
  filter: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  filterText: {},
  results: {
    flex: 80,
    width: '100%',
    height: '100%',
  },
  result: {
    fontSize: 15,
    marginTop: 18,
    backgroundColor: '#52b07b',
    padding: 10,
    color: 'white',
    marginHorizontal: 10,
  },
});

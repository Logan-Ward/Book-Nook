import React, { useState } from 'react';
import { Alert, StyleSheet, View, Pressable, Text } from 'react-native';
import { Input } from 'react-native-elements';
import supabase from '../lib/supabase';
import HomeButton from '../components/HomeButton';

export default function Auth({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) Alert.alert(error.message);
      else navigation.navigate('Home');
    } catch (err) {
      console.error(err, 'lookie here');
    }
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) Alert.alert(error.message);
      else navigation.navigate('Home');
    } catch (err) {
      console.error(err, 'signup error 2');
    }
    setLoading(false);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            labelStyle={styles.inputL}
            label='Email'
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder='email@address.com'
            autoCapitalize={'none'}
            style={styles.input}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            labelStyle={styles.inputL}
            label='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder='password'
            autoCapitalize={'none'}
            style={styles.input}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Pressable style={styles.button} onPress={() => signInWithEmail()}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
        <View style={styles.verticallySpaced}>
          <Pressable style={styles.button} onPress={() => signUpWithEmail()}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
      <HomeButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 85,
    marginTop: 40,
    padding: 12,
    width: '100%',
    height: '100%',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    borderBottomColor: 'green'
  },
  inputL: {
    color: 'black',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 2,
    paddingBottom: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

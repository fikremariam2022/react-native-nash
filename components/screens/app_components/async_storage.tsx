import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Login = ({navigation}: any) => {
  const [name, setName] = useState('');
  //set default value for name if exist
  useEffect(() => {
    getData().then(val => setName(val));
  }, []);

  const handlePress = async () => {
    if (name.length === 0)
      return Alert.alert('Warnning!', 'Please write your data');
    else {
      try {
        await AsyncStorage.setItem('UserName', name);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('Home');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/async.png')}
        style={styles.logo}
      />
      <Text style={styles.title_text}>Async Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={name}
        onChangeText={val => {
          setName(val);
        }}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.button_text}>Login</Text>
      </Pressable>
    </View>
  );
};
export const Home = ({navigation}: any) => {
  //const {myName} = route.params;
  const [data, setData] = useState('');
  const update = async () => {
    try {
      setData(data);
      await AsyncStorage.setItem('UserName', data);
      navigation.goBack();
    } catch (error) {}
  };
  const remove = () => {
    AsyncStorage.removeItem('UserName');
    //to clear everything
    //AsyncStorage.clear();
    navigation.goBack();
  };
  useEffect(() => {
    getData().then(val => setData(val));
  }, []);

  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={styles.title_text}>Welcome, {data}</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={val => setData(val)}
      />
      <Pressable style={styles.button} onPress={update}>
        <Text style={styles.button_text}>Update</Text>
      </Pressable>
      <Pressable
        style={[styles.button, {backgroundColor: 'red'}]}
        onPress={remove}>
        <Text style={styles.button_text}>Remove</Text>
      </Pressable>
    </View>
  );
};
export default Login;

const getData = async (): Promise<any> => {
  try {
    const val = await AsyncStorage.getItem('UserName');
    return val;
  } catch (error) {
    return null;
  }
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  title_text: {
    fontSize: 40,
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: 300,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'silver',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#1eb900',
    width: 140,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  button_text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

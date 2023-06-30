import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';
import {useFocusEffect} from '@react-navigation/native';

const errorCB = (err: any) => {
  console.log('SQL Error: ' + err);
};

const successCB = () => {
  console.log('SQL executed fine');
};

const openCB = () => {
  console.log('Database OPENED');
};
var db = SQLite.openDatabase(
  'test.db',
  '1.0',
  'Test Database',
  200000,
  openCB,
  errorCB,
);
const createTable = () =>
  db.transaction(tx => {
    console.log('query execution started');
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'Users ' +
        ' (Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);',
    );
  });

export const Login = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  //set default value for name if exist
  useFocusEffect(
    React.useCallback(() => {
      createTable();
      getData(setName, setAge);
      console.log('use effect', name, age);
    }, []),
  );

  const handlePress = async () => {
    if (name.length === 0)
      return Alert.alert('Warnning!', 'Please write your data');
    else {
      try {
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/sqllite.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title_text}>SQLite Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={name}
        onChangeText={val => setName(val)}
      />
      <Text style={{fontSize: 30}}>Your age is, {age.toString()}</Text>
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.button_text}>Login</Text>
      </Pressable>
    </View>
  );
};
export const Home = ({navigation}: any) => {
  //const {myName} = route.params;
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  useFocusEffect(
    React.useCallback(() => {
      getData(setName, setAge);
      console.log('use effect', name, age);
    }, []),
  );
  const remove = () => {
    db.transaction((tx: any) => {
      tx.executeSql('DELETE FROM Users');
    });
    navigation.goBack();
  };

  const onUpdate = async () => {
    await insert(name, age);
    navigation.goBack();
  };
  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={styles.title_text}>Welcome, {name}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={val => setName(val)}
      />
      <TextInput
        style={styles.input}
        value={age.toString()}
        onChangeText={val => setAge(parseInt(val))}
      />
      <Pressable style={styles.button} onPress={onUpdate}>
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

const getData = (setName: any, setAge: any) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Name, Age FROM Users',
        [],
        (tx: any, results: any) => {
          console.log('Query completed');
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            var row = results.rows.item(len - 1);
            //console.log('row', row);
            setName(row.Name);
            setAge(row.Age);
          } else {
            setName('');
            setAge(0);
          }
        },
      );
    });
  } catch (error) {
    console.log('error', error);
  }
};
const insert = async (name: string, age: number) => {
  try {
    if (name.length !== 0 && age > 0) {
      await db.transaction(async (tx: any) => {
        await tx.executeSql('INSERT INTO Users (Name, Age) VALUES (?, ? )', [
          name,
          age,
        ]);
        console.log('inserted successfully for ' + name + ' ' + age);
      });
    }
  } catch (error) {
    console.log('INSERT ERROR', error);
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
    height: 90,
    marginBottom: 20,
    marginTop: 15,
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

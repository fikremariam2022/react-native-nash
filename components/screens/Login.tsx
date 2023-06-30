import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setName, setAge, increaseAge, fetchCities} from '../../redux/actions';
import PushNotification from 'react-native-push-notification';
const createChannel = () => {
  PushNotification.createChannel({
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
  });
};
const errorCB = (err: any) => {
  console.log('SQL Error: ' + err);
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
  const {name, age, cities} = useSelector((state: any) => state.useReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      createTable();
      createChannel();
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
        onChangeText={val => {
          if (val) dispatch(setName(val));
        }}
      />

      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.button_text}>Login</Text>
      </Pressable>
    </View>
  );
};
export const Home = ({navigation}: any) => {
  const {name, cities} = useSelector((state: any) => state.useReducer);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      getData(dispatch);
      dispatch(fetchCities());
      createChannel();
    }, []),
  );
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'channel-id', // (required)
      channelName: 'Special messasge', // (required)
    });
  };
  const handleNotification = (item: any, index: number) => {
    //PushNotification.cancelAllLocalNotifications();
    PushNotification.cancelLocalNotifications({id: 1});
    PushNotification.localNotification({
      channelId: 'channel-id',
      title: 'you click on ' + item.country,
      message: 'the city is ' + item.city,
      bigText:
        item.city +
        'is one of the largest and most beautiful city in the world',
      color: 'red',
      id: index,
    });

    PushNotification.localNotificationSchedule({
      channelId: 'channel-id',
      title: 'Scheduled Notification',
      message: 'This is a scheduled message to alert',
      date: new Date(Date.now() + 20 * 1000),
      allowWhileIdle: true,
    });
  };
  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <Text style={styles.title_text}>Welcome {name}</Text>
      <FlatList
        data={cities}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => handleNotification(item, index)}>
            <View style={styles.item}>
              <Text style={styles.title_text}>{item.country},</Text>
              <Text>{item.city}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.city}
      />
    </View>
  );
};
export default Login;

const getData = (dispatch: any) => {
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
            dispatch(setName(row.Name));
            dispatch(setAge(row.Age));
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
  item: {
    borderRadius: 8,
    marginTop: 15,
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    border: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

/* eslint-disable prettier/prettier */
import {View, Text, Pressable, StyleSheet} from 'react-native';

const ScreenB = ({route, navigation}: any) => {
  //const {ItemInitial} = route.params;
  const {Item1} = route.params;
  console.log(route.params);
  return (
    <View style={styles.body}>
      <Text style={styles.text_title}>Screen b</Text>
      <Pressable
        onPress={() => navigation.goBack()}
        style={({pressed}) => [
          styles.button,
          {backgroundColor: pressed ? '#ddd' : '#0ff'},
        ]}>
        <Text>{Item1}</Text>
        <Text style={styles.text_normal}>Go back</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  text_title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  text_normal: {
    fontSize: 28,
  },
  button: {
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 4,
    color: 'white',
    padding: 10,
    marginTop: 5,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
});
export default ScreenB;

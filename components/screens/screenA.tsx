/* eslint-disable prettier/prettier */
import {View, Text, Pressable, StyleSheet} from 'react-native';

const ScreenA = ({navigation}: any) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <View style={styles.body}>
      <Text style={styles.text_title}>Screen A</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          const Item1 = {
            Item1: 'This is parameter va    lue sent from screen A',
          };
          navigation.navigate('Screen_B', Item1);
        }}>
        <Text style={styles.text_normal}>Go to screen B</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  text_title: {
    fontSize: 40,
    //fontWeight: 'bold',
    fontFamily: 'Pacifico-Regular',
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
export default ScreenA;

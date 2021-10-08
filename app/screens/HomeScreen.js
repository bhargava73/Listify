import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { auth } from '../../firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { UserContext } from '../UserContext';

const HomeScreen = ({navigation}) => {

  const {user} = React.useContext(UserContext);

  const { colors } = useTheme();

  const handleSignOut = () => {
    console.log("logged out ", user.email)
    auth.
    signOut()
    .then(() => {
      navigation.navigate("SignInScreen")
    })
    .catch(error => alert(error.message))
  }

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <View style={styles.head}>
        <TouchableOpacity>
          <AntDesign 
            name="menufold"
            color={colors.text}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            name="bell"
            color={colors.text}
            size={30}
          />
        </TouchableOpacity>
        </View>
        <Text style={styles.text}>What's up {user.username}!</Text>
        {/* <Image source={require('../assets/user_placeholder.png')} resizeMode="contain" style={styles.image}>
        </Image> */}
      <Button
        // title="Go to details screen"
        title="logout"
        // onPress={() => navigation.navigate("Details")}
        onPress={handleSignOut}
      />
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff',
    alignItems: 'center'
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
  },
  image: {
    marginTop: 20,
    flex: 1,
    justifyContent: "flex-start",
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    width: '100%',
    padding: 15,
    justifyContent: 'flex-start'
  }
});

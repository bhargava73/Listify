import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { auth } from '../../firebase';

const HomeScreen = ({navigation}) => {

  const { colors } = useTheme();

  const handleSignOut = () => {
    auth.
    signOut()
    .then(() => {
      navigation.replace("SignInScreen")
    })
    .catch(error => alert(error.message))
  }

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <Text style={{color: colors.text}}>Home Screen</Text>
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
    alignItems: 'center', 
    justifyContent: 'center'
  },
});

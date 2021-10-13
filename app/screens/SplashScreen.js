import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    ImageBackground,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import {auth,db} from '../../firebase'

const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();


    return (
      <View style={styles.container}>
        <ImageBackground source={require('../assets/welcome.png')} resizeMode="contain" style={styles.image}>
        <StatusBar backgroundColor='#ffffff' barStyle="dark-content"/>
        </ImageBackground>
        <Animatable.View animation="fadeInUpBig" style={styles.header}>
            <Text style={[styles.title, {
                color: colors.text
            }]}>Never miss a task!</Text>
            <Text onPress={()=>navigation.navigate('SignInScreen')} style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')}>
                    <LinearGradient
                        colors={['#FF725E', '#ff8e80']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get Started</Text>
                        <MaterialIcons 
                            name="navigate-next"
                            color="#fff"
                            size={20}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen

const {height} = Dimensions.get("screen");
const height_logo = height * 0.24;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ffffff'
  },
  header: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 50,
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",

  },
  footer: {
      flex: 1,
      backgroundColor: '#fefefe',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
      paddingHorizontal: 30,
      marginTop: 0,
      backgroundColor: '#fefefe'
  },
  logo: {
      width: height_logo,
      height: height_logo,
      marginTop: 50
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center'
  },
  text: {
      color: '#666666',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

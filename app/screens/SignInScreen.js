import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    ImageBackground,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import { UserContext } from '../UserContext';

import { useTheme } from 'react-native-paper';
import { auth } from '../../firebase';
const SignInScreen = ({navigation}) => {

    const {user, setUser, login} = React.useContext(UserContext);

    const { colors } = useTheme();
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [data, setData] = useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const textInputChange = (val) => {
        if(emailRegex.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    // const handleValidUser = (val) => {
    //     if( val.trim().length >= 4 ) {
    //         setData({
    //             ...data,
    //             isValidUser: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             isValidUser: false
    //         });
    //     }
    // }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                navigation.navigate("HomeScreen")
            }
        })
        return unsubscribe
    }, [])

    const handleSignInSubmit = (email, password) => {
        if (data.isValidUser===true && data.isValidPassword===true ){
            login(email,password);
        }
    }

    return (
      <Animatable.View animation="zoomIn" style={styles.container}>
        <ImageBackground source={require('../assets/enter.png')} resizeMode="contain" style={styles.image}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content"/>
        </ImageBackground>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome back!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer]}
        >
            <Text style={[styles.text_footer]}>Email</Text>
            <View style={styles.action}>
                <MaterialIcons
                    name="mail-outline"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email Id"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Please enter a valid email.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            
            <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {handleSignInSubmit( data.email, data.password )}}
                >
                <LinearGradient
                    colors={['#FF725E', '#ff8e80']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>
                {/* <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        Don't have an account? 
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={[styles.color_textPrivate, {fontWeight: 'bold',color: '#009387'}]}> Register now!</Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity
                    onPress={() => navigation.replace('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#042c48aa',
                        borderWidth: 1,
                        marginTop: 20,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#042c48aa'
                    }]}>Ops...I don't have an account yet</Text>
                </TouchableOpacity>
                </View>
        </Animatable.View>
      </Animatable.View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#ffffff'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        // marginBottom: -40
    },
    image: {
        marginTop: 20,
        flex: 1,
        justifyContent: "flex-start",
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: -40
    },
    text_header: {
        color: '#444444',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 30,
        marginBottom: 60
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
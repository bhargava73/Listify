import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Button, 
    Alert,
    TouchableOpacity, 
    Dimensions,
    TextInput,
    ImageBackground,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {auth} from '../../firebase';
import { UserContext } from '../UserContext';

const SignUpScreen = ({navigation}) => {
    const {user, setUser, register} = React.useContext(UserContext);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        isValidPassword: true,
        check_textInputChange: false,
        check_usernameInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const usernameInputChange = (val) => {
        if( val.length !== 0 && emailRegex.test(val)) {
            setData({
                ...data,
                username: val,
                check_usernameInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_usernameInputChange: false
            });
        }
    }

    const textInputChange = (val) => {
        if( val.length !== 0 && emailRegex.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
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

    const handleConfirmPasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                confirm_password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
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

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                navigation.navigate("SignInScreen")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUpSubmit = (username, email, password, confirm_password) => {

        if (username.length < 4) {
            Alert.alert('','Username must be atleast 4 characters.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if (email.length === 0 || !emailRegex.test(data.email) ) {
            Alert.alert('','Please enter a valid email id.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( data.password.length < 8 || data.confirm_password.length < 8 ) {
            Alert.alert('','Password should be atleast 8 characters', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( data.password !== data.confirm_password ) {
            Alert.alert('','Password and Confirm Password does not match.', [
                {text: 'Okay'}
            ]);
            return;
        }else {
            register(username,email,password);
        }
    }

    return (
      <Animatable.View animation="zoomIn"style={styles.container}>
        <ImageBackground source={require('../assets/register.png')} resizeMode="contain" style={styles.image}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content"/>
        </ImageBackground>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <Feather
                        name="user"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => usernameInputChange(val)}
                    />
                    {data.check_usernameInputChange ? 
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

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Email</Text>
                <View style={styles.action}>
                    <MaterialIcons
                        name="mail-outline"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Email Id"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
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

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Your Password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
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

                <Text style={[styles.text_footer, {
                    marginTop: 35
                }]}>Confirm Password</Text>
                <View style={styles.action}>
                    <Feather 
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput 
                        placeholder="Confirm Your Password"
                        secureTextEntry={data.confirm_secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmSecureTextEntry}
                    >
                        {data.confirm_secureTextEntry ? 
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
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By signing up enjoy the premium features of our app.
                    </Text>
                    {/* <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                    <Text style={styles.color_textPrivate}>{" "}and</Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text> */}
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {handleSignUpSubmit(data.username,data.email, data.password, data.confirm_password)}}
                    >
                        <LinearGradient
                            colors={['#FF725E', '#ff8e80']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Already have an account? 
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold',color: '#009387'}]}> Sign in now!</Text>
                        </TouchableOpacity>
                    </View> */}

                    <TouchableOpacity
                        onPress={() => navigation.replace('SignInScreen')}
                        style={[styles.signIn, {
                            borderColor: '#042c48aa',
                            borderWidth: 1,
                            marginTop: 20,
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#042c48aa'
                        }]}>Hey...I already have an account!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Animatable.View>
      </Animatable.View>
    );
};

export default SignUpScreen;

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
        marginTop: -40
    },
    image: {
        flex: 1,
        marginTop: 20,
        justifyContent: "flex-start",
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginTop: -70
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -4,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
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

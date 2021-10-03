import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Button, 
    Alert,
    TouchableOpacity, 
    Dimensions,
    TextInput,
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

const SignUpScreen = ({navigation}) => {

    const [data, setData] = useState({
        email: '',
        password: '',
        confirm_password: '',
        isValidPassword: true,
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                navigation.navigate("SignInScreen")
            }
        })
        return unsubscribe
    }, [])

    const handleSignUpSubmit = (email, password, confirm_password) => {

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
            auth.
            createUserWithEmailAndPassword(email,password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("registered user is ",user.email)
            })
            .catch(error => alert(error.message))
        }
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
                <Text style={styles.text_footer}>Email</Text>
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
                        onPress={() => {handleSignUpSubmit(data.email, data.password, data.confirm_password)}}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            Already have an account? 
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold',color: '#009387'}]}> Sign in now!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
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
        borderRadius: 10
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

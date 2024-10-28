import React, { useState } from 'react';
import { firebase_auth } from '../../Config';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [load, setLoad] = useState(false);

    const auth = firebase_auth;

    const forgetpass = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'Invalid email address.');
            } else if (error.code === 'auth/user-not-found') {
                Alert.alert('Error', 'No user found with this email.');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        }
    };

    const login = async () => {
        setLoad(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, pass);
            console.log('Login Complete');
            // Store the user token
            await AsyncStorage.setItem('userToken', response.user.uid);
            router.replace('/(tabs)'); // Navigate to the tabs layout
        } catch (e) {
            console.log("Login Failed");
            Alert.alert('Error', "Login Failed : " + e.message);
        } finally {
            setLoad(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>
                    Welcome back! Glad to see you again <Text style={styles.redDot}>.</Text>
                </Text>
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>Login</Text>
                    <View style={styles.dividerLine} />
                </View>

                <Text style={styles.inputLabel}>
                    Email <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Text style={[styles.inputLabel, styles.passwordLabel]}>
                    Password <Text style={styles.required}>*</Text>
                </Text>
                <TextInput
                    placeholder="Password"
                    value={pass}
                    onChangeText={setPass}
                    secureTextEntry
                    style={styles.input}
                />
                <View style={styles.linkContainer}>
                   <View></View>
                    <TouchableOpacity onPress={forgetpass}>
                        <Text style={styles.link}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={login}
                    disabled={load}
                >
                    {load ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={styles.loginButtonText}>Login</Text>
                    )}
                </TouchableOpacity>
                <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
               
                        
                            <View style={{flexDirection:'row' , marginTop:20}}>
                            <Text>Don't have a account?</Text>
                            <TouchableOpacity><Link href={"/(auth)/register"}>
                            <Text style={{  color: '#007AFF'}}> Register</Text>
                            </Link></TouchableOpacity>
                            </View>
                        
                  
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    formContainer: {
        width: '80%',
    },
    title: {
        marginBottom: 45,
        fontSize: 29,
        fontWeight: '900',
        color: '#333',
    },
    redDot: {
        color: 'red',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#000',
    },
    inputLabel: {
        fontWeight: '900',
        marginBottom: 12,
        marginTop: 25,
        color: '#333',
    },
    required: {
        fontWeight: '900',
        color: 'red',
    },
    input: {
        backgroundColor: '#F7F8FA',
        height: 50,
        borderRadius: 12,
        paddingLeft: 22,
        fontSize: 16,
    },
    passwordLabel: {
        marginTop: 22,
    },
    linkContainer: {
        marginBottom: 32,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    link: {
        color: '#007AFF',
        fontSize: 16,
    },
 
    loginButton: {
        justifyContent: 'center',
        borderRadius: 12,
        alignItems: 'center',
        height: 50,
        backgroundColor: 'black',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default Login;
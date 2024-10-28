import React, { useState } from 'react';
import { firebase_auth } from '../../Config';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [load, setload] = useState(false);
    const [name, setname] = useState('');

    const auth = firebase_auth;

    const Register = async () => {
        setload(true)
        try {
            const responce = await createUserWithEmailAndPassword(auth, email, pass)
            console.log(responce);
            Alert.alert('Verification', "Please cheack out your email for verification")

           } catch (e) {
            console.log(e);
            Alert.alert('Error', "Register Failed : " + e.message)
        } finally {
            setload(false)
        }

    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '80%' }}>
                    <Text style={{ marginBottom: 20, fontSize: 29, fontWeight: '900' }}>
                        Hello! Register to get started <Text style={{ color: 'red' }}>.</Text>
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 20,
                        }}
                    >
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                        <Text
                            style={{
                                marginHorizontal: 10,
                                fontSize: 16,
                                color: '#000',
                            }}
                        >
                            Register
                        </Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
                    </View>
                    <Text style={{ fontWeight: '900', marginBottom: 12, marginTop: 25 }}>
                        Name <Text style={{ fontWeight: '900', color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setname(text)}
                        style={{
                            backgroundColor: '#F7F8FA',
                            height: 50,
                            borderRadius: 12,
                            paddingLeft: 22,
                        }}
                    />
                    <Text style={{ fontWeight: '900', marginBottom: 12, marginTop: 25 }}>
                        Email <Text style={{ fontWeight: '900', color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setemail(text)}
                        style={{
                            backgroundColor: '#F7F8FA',
                            height: 50,
                            borderRadius: 12,
                            paddingLeft: 22,
                        }}
                    />
                    <Text style={{ fontWeight: '900', marginBottom: 12, marginTop: 22 }}>
                        Password <Text style={{ fontWeight: '900', color: 'red' }}>*</Text>
                    </Text>
                    <TextInput
                        placeholder="Password"
                        value={pass}
                        onChangeText={(text) => setpass(text)}
                        style={{
                            backgroundColor: '#F7F8FA',
                            height: 50,
                            borderRadius: 12,
                            paddingLeft: 22,
                            marginBottom: 12,
                        }}
                    />
                      <View style={{marginBottom: 32,margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                      <View style={{  width:'100%',justifyContent:'space-between',flexDirection:'row' }}>
    <View></View>
    <TouchableOpacity>
        <Link href={'Comps/Auth/Login'}>
            <Text>Have a account?</Text>
        </Link>
    </TouchableOpacity>
</View>

           

                      </View>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            borderRadius: 12,
                            alignItems: 'center',
                            height: 50,
                            width: '100%',
                            backgroundColor: 'black',
                        }}

                        onPress={Register}
                    >
                        {load ? <ActivityIndicator size="large" /> : <Text style={{ color: 'white' }}>Register</Text>}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Login;

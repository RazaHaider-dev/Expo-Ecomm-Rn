import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { firebase_auth } from '../../Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendPasswordResetEmail } from 'firebase/auth';


function Settings() {
    const favorites = useSelector((state) => state.cart.favorites);
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const logout = async () => {
        try {
          // Sign out from Firebase
          await firebase_auth.signOut();
          
          // Clear the user token from AsyncStorage
          await AsyncStorage.removeItem('userToken');
          
          // Optionally, clear any other user-related data from AsyncStorage
          // For example:
          // await AsyncStorage.removeItem('userData');
          
          // Navigate to the login screen
          router.replace('/(auth)/Screen1');
        } catch (error) {
          console.error('Error during logout:', error);
          // You might want to show an error message to the user here
        }

      };

      const sendResetEmail = async () => {
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


  return (
    <>
    <ScrollView>
        
    <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text>Personalize your self to next</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Link href={'./Liked'}><Ionicons name="heart-outline" size={24} color="#333" /></Link>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon} onPress={() => { }}>
            <Link href={'CartPage'} >
              {/* Wrapping only the clickable content in Link */}
              <View style={styles.cartContent}>
                <Ionicons name="cart-outline" size={24} color="#333" />
                {cart.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.length}</Text>
                  </View>
                )}
              </View>
            </Link>
          </TouchableOpacity>

        </View>
      </View>
      <View style={{ backgroundColor: 'white',marginTop:-10, height: 100, padding: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <TextInput
          placeholder='Search Products'
          style={{ width: '100%', height: 50, borderRadius: 50, borderWidth: 1, paddingLeft: 20 }}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          returnKeyType="search"
        />
      </View>
<TouchableOpacity onPress={logout}>
<View style={{padding:10}}>
        <View style={{alignItems:'center',gap:10,height:66,backgroundColor:'white', borderRadius:12,paddingLeft:15,flexDirection:'row'}}>
            <Ionicons name='log-out-outline' size={27} color={'black'}/>
            <Text style={{fontSize:18}}>Logout</Text>
            </View>
      </View>
</TouchableOpacity>
<TouchableOpacity onPress={sendResetEmail}>
<View style={{padding:10}}>
        <View style={{alignItems:'center',gap:10,height:66,backgroundColor:'white', borderRadius:12,paddingLeft:15,flexDirection:'row'}}>
            <Ionicons name='log-out-outline' size={27} color={'black'}/>
            <Text style={{fontSize:18}}>Reset Password</Text>
            </View>
      </View>
</TouchableOpacity>
      
    </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
      backgroundColor: 'white',
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cartIcon: {
      marginLeft: 20,
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      right: -6,
      top: -6,
      backgroundColor: '#6a11cb',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  
  })
  

export default Settings

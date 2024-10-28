import { router, Tabs } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have expo/vector-icons installed
import { CustomTitle } from './CustomTitle'; // Your custom title component
import {} from '../(tabs)/CartPage.jsx'

const HeaderRightButtons = () => (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity 
        onPress={() => router.push('../(tabs)/Liked')} 
        style={{ marginRight: 15 }} 
      >
        <Ionicons name="heart" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => router.push('../(tabs)/CartPage')} 
        style={{ marginRight: 10  }}
      >
        <Ionicons name="cart-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  export default HeaderRightButtons


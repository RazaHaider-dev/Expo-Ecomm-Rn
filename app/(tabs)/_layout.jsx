import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomTitle from '../Comps/CustomTitle';
import HeaderRightButtons from '../Comps/HeaderRightButtons';

const TabIcon = ({ name, color, size }) => (
  <View style={styles.tabIconContainer}>
    <Ionicons name={name} size={size} color={color} />
  </View>
);

function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#f8f9fa', // Light background for the header
        },
        headerTintColor: '#343a40', // Dark color for header text
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          height: 60,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Liked') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'CartPage') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <TabIcon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#007bff', // Bright blue for active tab
        tabBarInactiveTintColor: '#6c757d', // Muted color for inactive tabs
        tabBarLabel: '', // This will hide the labels
      })}
    >
      <Tabs.Screen 
        name='index' 
        options={{
          headerShown:false
        }}
        // options={{
        //   headerTitle: () => <CustomTitle title={'Narcotic'} txt={"A way to brand yourself good"} />,
        //   headerTitleAlign: 'left',
        //   headerRight: () => <HeaderRightButtons />,
        // }}
      />

      <Tabs.Screen 
        name='Products'
        options={{
          headerShown:false
        }}
        // options={{
        //   headerTitle: () => <CustomTitle title={'Products'} txt={'A variety of Dreams collections'}/>,
        //   headerTitleAlign: 'left',
        //   headerRight: () => <HeaderRightButtons />,
        // }} 
      />
      
      <Tabs.Screen 
        name='Liked'
        options={{
          headerShown:false
        }}
        // options={{
        //   headerTitle: () => <CustomTitle title={'Favorites'} txt={'Your curated collection'}/>,
        //   headerTitleAlign: 'left',
        //   headerRight: () => <HeaderRightButtons />,
        // }} 
      />
      
      <Tabs.Screen 
        name='CartPage'
        options={{
          headerShown:false
        }}
        // options={{
        //   headerTitle: () => <CustomTitle title={'Cart'} txt={'Ready to checkout?'}/>,
        //   headerTitleAlign: 'left',
        //   headerRight: () => <HeaderRightButtons />,
        // }} 
      />
      
      <Tabs.Screen 
        name='Settings'
        options={{
          headerShown:false
        }}
        // options={{
        //   headerTitle: () => <CustomTitle title={'Products'} txt={'A variety of Dreams collections'}/>,
        //   headerTitleAlign: 'left',
        //   headerRight: () => <HeaderRightButtons />,
        // }} 
      />
    
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default TabsLayout;
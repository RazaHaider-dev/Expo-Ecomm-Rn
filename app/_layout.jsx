import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Store from './Store';
import { StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';

function RootLayoutNav() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenStarterScreens, setHasSeenStarterScreens] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    checkStarterScreensStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkStarterScreensStatus = async () => {
    try {
      const hasSeenScreens = await AsyncStorage.getItem('hasSeenStarterScreens');
      setHasSeenStarterScreens(!!hasSeenScreens);
    } catch (error) {
      console.error('Error checking starter screens status:', error);
    }
  };

  if (isLoading) {
    // You might want to show a loading screen here
    return null;
  }
  
LogBox.ignoreAllLogs();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!hasSeenStarterScreens && (
        <Stack.Screen name="(auth)/Screen1" options={{ headerShown: false }} />
      )}
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

function RootLayout() {
  return (
    <StripeProvider publishableKey='pk_test_51Q5rrP02JvT4Fn9oqaMvleM1SKNFBrPhKGVqR6OpGEvX5HnBi8JO5XnCNaFBSKstmfAPHe9sDzW2ROgXIZmN12TD005SVhNCja'>
      <Provider store={Store}>
        <RootLayoutNav />
      </Provider>
    </StripeProvider>
  );
}

export default RootLayout;
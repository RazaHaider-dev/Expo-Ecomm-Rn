import React, { useRef } from 'react';
import { Text, TouchableOpacity, Dimensions, View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

function Screen2() {
  const animation = useRef(null);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />
      <View style={styles.content}>
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={styles.animation}
            source={require('./assets/Screen2.json')}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Fast, Safe and secure transactions</Text>
          <Text style={styles.subtitle}>
            Discover a world of products at your fingertips. Shop smarter, faster, and easier than ever before.
          </Text>
        </View>
      </View>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Link href={'Screen1'}>
          <Text style={styles.buttonTextSecondary}>Back</Text></Link>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Link href={'Screen3'}><Text style={styles.buttonTextPrimary}>Next</Text>
          </Link>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:-70
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  animationContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: -10,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 16,
    marginTop:-10
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    width:'90%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: 'black',
    marginLeft: 12,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Screen2;
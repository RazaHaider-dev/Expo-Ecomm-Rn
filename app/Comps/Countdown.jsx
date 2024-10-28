import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

const CountdownTimer = ({ targetDate, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const fadeAnim = new Animated.Value(1);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 0.5, duration: 300, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true })
      ]).start();
    }, 1000);

    if (Object.keys(timeLeft).length === 0) {
      clearTimeout(timer);
      onComplete && onComplete();
    }

    return () => clearTimeout(timer);
  });

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <LinearGradient
      colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* <Text style={{textAlign:'center' , fontSize:35,fontWeight:700}}>Sales Ends In</Text> */}
      {Object.keys(timeLeft).length === 0 ? (
        <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Time's up!</Animated.Text>
      ) : (
        <View style={styles.timerContainer}>
          {['days', 'hours', 'minutes'].map((interval, index) => (
            <View style={styles.timeWrapper} key={index}>
              <MotiView
                key={interval}
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 500,
                  delay: index * 100,
                }}
                style={styles.timeBlock}
              >
                <Animated.Text style={[styles.number, { opacity: fadeAnim }]}>
                  {formatTime(timeLeft[interval])}
                </Animated.Text>
                <Text style={styles.label}>{interval}</Text>
              </MotiView>
              {/* Only add colon if it's not the last item */}
              {index < 3 && <Text style={styles.colon}></Text>}
            </View>
          ))}
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    minWidth: 80,
  },
  number: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  colon: {
    fontSize: 32,
    color: '#ffffff',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default CountdownTimer;





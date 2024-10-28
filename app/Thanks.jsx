import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Thanks = ({ navigation, orderNumber = "1234567" }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f6f9fc', '#ecf3f9']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          </View>
          <Text style={styles.title}>Thank You</Text>
          <Text style={styles.subtitle}>Your order has been confirmed</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Order Summary</Text>
            <View style={styles.cardContent}>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Order Number:</Text>
                <Text style={styles.cardValue}>{orderNumber}</Text>
              </View>
              <View style={styles.cardRow}>
                <Text style={styles.cardLabel}>Estimated Delivery:</Text>
                <Text style={styles.cardValue}>3-5 business days</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('OrderDetails', { orderNumber })}
          >
            <Text style={styles.primaryButtonText}>View Order Details</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Link href={'./(tabs)/index'}><Text style={styles.secondaryButtonText}>Continue Shopping</Text>
            </Link>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f9fc',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cardContent: {
    width: '100%',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardLabel: {
    fontSize: 16,
    color: '#666',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  secondaryButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Thanks;
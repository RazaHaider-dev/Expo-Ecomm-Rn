import React, { useState, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, Modal, FlatList, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../Reducers/CarReducers';
import { db } from '../../Config';
import { doc, setDoc } from 'firebase/firestore';
import { BlurView } from 'expo-blur';
import ConfettiCannon from 'react-native-confetti-cannon';
import {CardField,useConfirmPayment} from "@stripe/stripe-react-native"
// ... (other component imports and definitions remain the same)
import {Checkbox} from 'expo-checkbox'
import { useNavigation } from 'expo-router';


const CustomTitle = ({ title, subtitle }) => (
    <LinearGradient
      colors={['#6C63FF', '#4CAF50']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.titleContainer}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </LinearGradient>
  );
  
  const InputField = ({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, icon }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={24} color="#6C63FF" style={styles.inputIcon} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#A0A0A0"
        />
      </View>
    </View>
  );
  
  const CitySelector = ({ selectedCity, setSelectedCity, cities }) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    const handleSelectCity = (city) => {
      setSelectedCity(city);
      setModalVisible(false);
    };
  
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>City</Text>
        <TouchableOpacity
          style={styles.citySelector}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="location-outline" size={24} color="#6C63FF" style={styles.inputIcon} />
          <Text style={styles.citySelectorText}>{selectedCity || 'Select a city'}</Text>
          <Ionicons name="chevron-down" size={24} color="#6C63FF" />
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView intensity={100} style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={cities}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleSelectCity(item)} style={styles.option}>
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  };
  
  const CartItem = ({ item, dispatch }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>
  ${item.price ? Number(item.price).toFixed(2) : '0.00'}
</Text><View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => dispatch(decrementQuantity(item))} style={styles.quantityButton}>
            <Ionicons name="remove" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => dispatch(incrementQuantity(item))} style={styles.quantityButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  

function CheckoutForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
const [cardDetails,setcardDetails]=useState()
  const confettiLeftRef = useRef(null);
  const confettiRightRef = useRef(null);
  const confettiCenterRef = useRef(null);
  const{confirmPayment,loading} = useConfirmPayment();
  const [isChecked, setChecked] = useState(false);

  const nav = useNavigation();

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston'];

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const { width, height } = Dimensions.get('window');

  const handleCheckout = useCallback(async () => {
    
    try {
      const myDoc = doc(db, 'ProductsSell', 'SellerData');
      const docData = {
        name,
        contact,
        email,
        city: selectedCity,
        address,
        cod:isChecked
      };
      await setDoc(myDoc, docData);
      setShowConfetti(true);
      if (confettiLeftRef.current && confettiRightRef.current && confettiCenterRef.current) {
        confettiLeftRef.current.start();
        setTimeout(() => confettiRightRef.current.start(), 100);
        setTimeout(() => confettiCenterRef.current.start(), 200);
      }
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Hide confetti after 5 seconds
      alert('Order placed successfully!');
      nav.navigate('Thanks')
    } catch (err) {
      alert('Error placing order: ' + err.message);
    }

  }, [name, contact, email, selectedCity, address]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ... (rest of the form remains the same) */}
        <SafeAreaView>
          <CustomTitle title="Checkout" subtitle="Complete your purchase" />
        </SafeAreaView>

        <View style={styles.cartContainer}>
          <Text style={styles.sectionTitle}>Your Cart</Text>
          <FlatList
            data={cart}
            renderItem={({ item }) => <CartItem item={item} dispatch={dispatch} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            icon="person-outline"
          />
          <InputField
            label="Contact Number"
            value={contact}
            onChangeText={setContact}
            placeholder="(123) 456-7890"
            keyboardType="phone-pad"
            icon="call-outline"
          />
          <InputField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="johndoe@example.com"
            keyboardType="email-address"
            icon="mail-outline"
          />
          <CitySelector
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cities={cities}
          />
          <InputField
          
            label="Complete Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your complete address"
            multiline
            numberOfLines={3}
            icon="home-outline"
          />

          {/* ddd */}
          
        </View>

        <View style={styles.totalContainer1}>
          <View><Text style={{fontSize:23,fontWeight:"700"}}>Payment Methods</Text>
          <View style={{flexDirection:'row' , alignItems:'center',gap:10,marginTop:20}}>
          <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
       <Text>Cash on delivery </Text>
          </View>
          <View style={{flexDirection:'row' , alignItems:'center',gap:10,marginTop:25,marginBottom:-10}}>
          {/* <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} /> */}
          <Text>Payment Throught Stripe</Text>
       
          </View>
          <CardField
                  postalCodeEnabled={true}
                  placeholders={{ number: "4242 4242 4242 4242" }}
                  cardStyle={styles.card}
                  style={styles.cardContainer}
                  onCardChange={cardDetails => {
                    setcardDetails(cardDetails);
                  }}
                />
          </View>

        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${totalPrice.toFixed(2)}</Text>
          <Text style={styles.taxInfo}>All charges included</Text>
        </View>



        <TouchableOpacity style={styles.checkoutButton} disabled={loading} onPress={handleCheckout}>
          <LinearGradient
            colors={['#6C63FF', '#4CAF50']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.checkoutButtonText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={24} color="#FFFFFF" style={styles.checkoutButtonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      
      {showConfetti && (
        <>
          <ConfettiCannon
            ref={confettiLeftRef}
            count={50}
            origin={{x: 0, y: height}}
            autoStart={false}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={3000}
            colors={['#ff00ff', '#00ff00', '#ffff00', '#00ffff']}
          />
          <ConfettiCannon
            ref={confettiRightRef}
            count={50}
            origin={{x: width, y: height}}
            autoStart={false}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={3000}
            colors={['#ff0000', '#0000ff', '#ff8800', '#8800ff']}
          />
          <ConfettiCannon
            ref={confettiCenterRef}
            count={50}
            origin={{x: width / 2, y: height}}
            autoStart={false}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={3000}
            colors={['#ff00ff', '#00ff00', '#ffff00', '#00ffff', '#ff0000', '#0000ff', '#ff8800', '#8800ff']}
          />
        </>
      )}
    </View>
  );
}

// ... (styles remain the same)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F8FA',
    },
    titleContainer: {
      padding: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    subtitle: {
      fontSize: 18,
      color: '#FFFFFF',
      marginTop: 5,
      opacity: 0.8,
    },
    cartContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      margin: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    formContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      margin: 15,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333333',
    },
    inputContainer: {
      marginBottom: 25,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      color: '#333333',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: 15,
    },
    input: {
      flex: 1,
      paddingVertical: 15,
      fontSize: 16,
      color: '#333333',
    },
    inputIcon: {
      marginRight: 10,
    },
    citySelector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 15,
    },
    citySelectorText: {
      flex: 1,
      fontSize: 16,
      color: '#333333',
      marginLeft: 10,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      maxHeight: '60%',
    },
    option: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    optionText: {
      fontSize: 16,
      color: '#333333',
    },

    card:{
      backgroundColor:'#efefefef'
    },
    cardContainer:{
      height:50,
      marginVertical:30
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      backgroundColor: '#F7F8FA',
      borderRadius: 15,
      padding: 15,
    },
    itemImage: {
      width: 80,
      height: 80,
      borderRadius: 10,
      marginRight: 15,
    },
    itemInfo: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333333',
      marginBottom: 5,
    },
    itemPrice: {
      fontSize: 16,
      color: '#6C63FF',
      fontWeight: '600',
      marginBottom: 10,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      backgroundColor: '#6C63FF',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityText: {
      fontSize: 18,
      fontWeight: '600',
      marginHorizontal: 15,
      color: '#333333',
    },
    totalContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      margin: 15,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    totalContainer1: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      margin: 15,
      padding:20,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    totalText: {
      fontSize: 20,
      fontWeight: '600',
      color: '#333333',
      marginBottom: 10,
    },
    totalAmount: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#6C63FF',
      marginBottom: 5,
    },
    taxInfo: {
      fontSize: 14,
      color: '#666666',
    },
    checkoutButton: {
      margin: 15,
      marginBottom: 30,
      overflow: 'hidden',
      borderRadius: 15,
    },
    gradientButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 18,
    },
    checkoutButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 10,
    },
    checkoutButtonIcon: {
      marginLeft: 10,
    },
  });
  

export default React.memo(CheckoutForm);
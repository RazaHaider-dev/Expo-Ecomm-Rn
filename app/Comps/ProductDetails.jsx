import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'; // Added useSelector to access the cart from Redux
import { addToCart, addToFavorite, removeFromCart } from '../Reducers/CarReducers'; // Import actions
import Slider from './Slider';

const { width } = Dimensions.get('window');

function ProductDetails() {
  // Extract parameters passed from previous component (ProductCard)
  const { id, images, img, title, tag, price, brand, category, availabilityStatus, discountPercentage, rating, stock, warrantyInformation, weight, dimensions } = useLocalSearchParams();
  
  // Convert the images string into an array
  const imageArray = images.split(',');

  const dispatch = useDispatch(); // To dispatch actions like adding or removing from cart
  
  // Use useSelector to get the current cart and favorites from the Redux store
  const cart = useSelector((state) => state.cart);  // Get the cart state from Redux
  const favorites = useSelector((state) => state.favorites);  // Get favorites from Redux if necessary

  // Calculate if the item is already in the cart based on the updated cart state
  const isItemInCart = Array.isArray(cart) && cart.some((item) => item.id === id);

  return (
    <ScrollView style={styles.container}>
      {/* Image Slider */}
      <View style={styles.imageContainer}>
        {images ? (
          <Slider image1={imageArray[0]} image2={imageArray[1]} image3={imageArray[2]} />
        ) : (
          <View style={styles.noImageContainer}>
            <AntDesign name="picture" size={50} color="#ccc" />
            <Text style={styles.noImageText}>No image available</Text>
          </View>
        )}
        <BlurView intensity={80} tint="dark" style={styles.priceTag}>
          <Text style={styles.priceText}>${price}</Text>
        </BlurView>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title || 'No title available'}</Text>
        <View style={styles.ratingContainer}>
          <View style={{ flexDirection: 'row', padding: 5, borderRadius: 10, backgroundColor: 'gold', justifyContent: 'center', alignItems: 'center' }}>
            <AntDesign name="star" size={18} color="white" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
          <Text style={{ marginLeft: 15 }}>{discountPercentage}% Off</Text>
        </View>
        <Text style={styles.tag}>{tag || 'No tag available'}</Text>

        {/* Product Details */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.detailsContainer}>
            <DetailItem icon="shirt-outline" label="Brand" value={brand} />
            <DetailItem icon="pricetags-outline" label="Category" value={category} />
            <DetailItem icon="file-tray-stacked-outline" label="Stock" value={stock} />
          </View>
          <View style={styles.detailsContainer}>
            <DetailItem icon="barbell-outline" label="Weight" value={weight} />
            <DetailItem icon="alert-circle-outline" label="Warranty" value={warrantyInformation} />
            <DetailItem icon="cube-outline" label="Dimensions" value={dimensions} />
          </View>
        </View>

        {/* Add/Remove from Cart Button */}
        <View style={styles.mainbutt}>
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={() => {
            dispatch(addToCart({ id, title, price, img })); // Then, dispatch the addToCart action
            Alert.alert("Added To Cart","Your item has been added to cart"); // First, show the alert
          }}
          
        >
     
      <AntDesign name="shoppingcart" size={24} color="white" />
    
          <Text style={styles.addToCartText}>
            {isItemInCart ? 'Remove from Cart' : 'Add to Cart'}  {/* Button text changes dynamically */}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.likebutton } onPress={()=>{
          dispatch(addToFavorite({ id, title, price, img}))
          Alert.alert("Added To Favourites","Your item has been added to favourites"); // First, show the alert
          

        }}>
<Ionicons name='heart' size={18}/>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

// DetailItem component for displaying product details
const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={24} color="#6200ee" />
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },likebutton: {
    backgroundColor: 'white',
    width: 50,
    height: 50, // Add height for a circular button
    borderRadius: 5000, // This makes the button fully circular
    shadowColor: 'black', // Color of the shadow
    shadowOffset: { width: 5, height: 5 }, // Offset the shadow slightly
    shadowOpacity: 0.7, // How transparent the shadow is
    shadowRadius: 5, // The blur radius of the shadow
    elevation: 5, // For Android to apply shadow
    justifyContent:'center',
    alignItems:'center'
  },
  
  mainbutt:{
    flexDirection:'row',
    justifyContent:'space-around',
    marginTop:50
  },
  imageContainer: {
    width: '100%',
    height: width * 1.2,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    marginTop: 10,
    color: '#888',
  },
  priceTag: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  discountText: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 10,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'white',
    fontWeight: "900",
  },
  tag: {
    fontSize: 18,
    color: 'grey',
    marginTop: 20,
    marginBottom: 40,
    fontWeight: '500',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginLeft: 10,
  },
  addToCartButton: {
    width:270,
    flexDirection: 'row',
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});

export default ProductDetails;

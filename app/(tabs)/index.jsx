import React, { useEffect, useState } from 'react';
import { ScrollView, View, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, addToFavorite, removeFromFavorite } from '../Reducers/CarReducers';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import ProductCard from '../Comps/ProductCard';
import Slider from '../Comps/Slider';
import CountdownTimer from '../Comps/Countdown';
import { Link } from 'expo-router';

const Index = () => {
  const cart = useSelector((state) => state.cart.cart);
  const favorites = useSelector((state) => state.cart.favorites);
  const dispatch = useDispatch();
  
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [tab,settab] = useState('mens-shirts')
  const [activeCategory, setActiveCategory] = useState('mens-shirts');

  const categories = ['mens-shirts', 'fragrances', 'tops', 'mens-shoes', 'sunglasses','womens-dresses','womens-shoes','womens-watches'];

  const addItemToCart = (item) => dispatch(addToCart(item));
  const removeItemFromCart = (item) => {
    console.log("Currently in function");
    dispatch(removeFromCart(item));}
  const addItemToFavorite = (item) => dispatch(addToFavorite(item));
  const removeItemFromFavorite = (item) => dispatch(removeFromFavorite(item));

  const fetchApi = async () => {
    try {
      setLoad(true);
      const res = await axios.get(`https://dummyjson.com/products/category/${tab}`);
      setData(res.data.products);
    } catch (e) {
      console.log('Error Occurred', e);
    } finally {
      setLoad(false);
    }
  };

 // Add tab as a dependency in useEffect so that it fetches data every time tab changes
 useEffect(() => {
  fetchApi();
}, [tab]); // Include tab here to re-fetch data when the tab (category) changes


const onclicktab = (category) => {
  setActiveCategory(category);
  settab(category);  // Update the tab state when a new category is selected
  console.log(category);
}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
          <Link href={'Liked'}><Ionicons name="heart-outline" size={24} color="#333" /></Link></TouchableOpacity>
          <TouchableOpacity style={styles.cartIcon} onPress={() => {}}>
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

      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#6a11cb', '#2575fc']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.heroGradient}
        >
          <Text style={styles.heroTitle}>Summer Collection</Text>
          <Text style={styles.heroSubtitle}>Discover the latest trends</Text>
          <TouchableOpacity style={styles.heroButton}>
            <Text style={styles.heroButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
  <TouchableOpacity
    key={index}
    style={[
      styles.categoryItem,
      activeCategory === category && styles.activeCategoryItem
    ]}
    onPress={() => onclicktab(category)}  // Use an anonymous function here
  >
    <Text style={[
      styles.categoryText,
      activeCategory === category && styles.activeCategoryText
    ]}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Text>
  </TouchableOpacity>
))}
</ScrollView>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Flash Sale</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={20} color="#6a11cb" />
        </TouchableOpacity>
      </View>

      {load ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#6a11cb" />
        </View>
      ) : (
        <View style={styles.productGrid}>
          {data.map((product) => (
             <ProductCard
             key={product.id}
              title={product.title}
              img={product.thumbnail}
              price={product.price}
              tag={product.description}
              id={product.id}
              stock={product.stock}
              rating={product.rating}
              discountPercentage={product.discountPercentage}
              category={product.category}
              brand={product.brand}
              tags={product.tags}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart}
              cart={cart}
              images={product.images}
              favorites={favorites}
              addItemToFavorite={addItemToFavorite}
              removeItemFromFavorite={removeItemFromFavorite}
              dimensions={product.dimensions}
              weight={product.weight}
              warrantyInformation={product.warrantyInformation}
              availabilityStatus={product.availabilityStatus}
            />
          ))}
        </View>
      )}

      <Slider image1={'https://img.freepik.com/premium-psd/fashion-sale-banner-square-flyer-social-media-post-template_169869-211.jpg'} image2={'https://i.pinimg.com/736x/53/b5/a3/53b5a31ebf9b4f3f9cec70f7c20815d5.jpg'} image3={'https://img.freepik.com/premium-psd/fashion-sale-banner-square-flyer-social-media-post-template_169869-218.jpg'}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  heroSection: {
    height: 200,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  heroButtonText: {
    color: '#6a11cb',
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
    padding:20
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  activeCategoryItem: {
    backgroundColor: '#6a11cb',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 16,
    color: '#6a11cb',
    marginRight: 5,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Index;
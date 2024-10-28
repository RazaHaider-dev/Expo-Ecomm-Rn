import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ProductCard from '../Comps/ProductCard';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorite, removeFromCart, removeFromFavorite } from '../Reducers/CarReducers';
import CountdownTimer from '../Comps/Countdown';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';


function Products() {
  const favorites = useSelector((state) => state.cart.favorites);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();


  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApi = async () => {
    try {
      setLoad(true);
      const [shirtsRes, fragrancesRes] = await Promise.all([
        axios.get("https://dummyjson.com/products/category/mens-shirts"),
        axios.get("https://dummyjson.com/products/category/mens-shoes"),

      ]);

      const fragrancesProducts = fragrancesRes.data.products;
      const shirtsProducts = shirtsRes.data.products;

      const combinedProducts = [...shirtsProducts, ...fragrancesProducts];

      console.log('Combined products:', combinedProducts);
      setData(combinedProducts);
    } catch (e) {
      console.log('Error Occurred', e);
    } finally {
      setLoad(false);
    }
  };

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const addItemToFavorite = (item) => {
    dispatch(addToFavorite(item));
  };

  const removeItemFromFavorite = (item) => {
    dispatch(removeFromFavorite(item));
  };

  // New function to handle search submission
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      fetchApi();
    } else {
      try {
        setLoad(true);
        const SearchedData = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`);
        setData(SearchedData.data.products);
      } catch (e) {
        console.log('Search Error Occurred', e);
      } finally {
        setLoad(false);
      }
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Products</Text>
          <Text>Where dreams comes to reality</Text>
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
      <View style={{ backgroundColor: 'white', height: 80, padding: 20,paddingTop:-10, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}>
        <TextInput
          placeholder='Search Products'
          style={{ width: '100%', height: 50, borderRadius: 50, borderWidth: 1, paddingLeft: 20 }}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <View style={{ padding: 10 }}>
        <CountdownTimer
          targetDate="2024-12-31T23:59:59"
          onComplete={() => console.log('Countdown finished')}
        />
      </View>
      {load ? (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 600 }}>
          <ActivityIndicator size={'large'} color={'purple'} />
        </View>
      ) : (
        <View style={{ padding: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
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
    </ScrollView>
  );
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

export default Products;
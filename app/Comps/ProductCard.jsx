import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function ProductCard({ id, title, price, tag, img,tags,brand,availabilityStatus,category,warrantyInformation,weight,dimensions,discountPercentage,rating,stock, images,addItemToCart, cart, removeItemFromCart, addItemToFavorite, favorites, removeItemFromFavorite }) {
  const isItemInCart = Array.isArray(cart) && cart.some((value) => value.id === id);
  const isItemFavorite = Array.isArray(favorites) && favorites.some((value) => value.id === id);

  return (
    <Pressable 
      style={styles.cardWrapper}  
      onPress={() => {
        router.push({
          pathname: 'Comps/ProductDetails',
          params: { id, title, price, images,img, tag ,tags,brand,category,availabilityStatus,discountPercentage,rating,stock,warrantyInformation,weight,dimensions,addItemToCart, cart, removeItemFromCart, addItemToFavorite, favorites, removeItemFromFavorite,isItemInCart}
        });
      }}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.img} source={{ uri: img }} />
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          />
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => isItemFavorite 
              ? removeItemFromFavorite({ id, title, price, img })
              : addItemToFavorite({ id, title, price, img })
            }
          >
            <Ionicons 
              name={isItemFavorite ? 'heart' : 'heart-outline'} 
              color={isItemFavorite ? '#ff4757' : 'white'} 
              size={24}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.tag} numberOfLines={1}>
              {category}
            </Text>
          </View>
          <View style={styles.priceActionContainer}>
            <Text style={styles.price}>${Math.round(price)}</Text>
            <TouchableOpacity 
              style={[
                styles.cartButton, 
                isItemInCart && styles.removeButton
              ]}
              onPress={() => isItemInCart 
                ? removeItemFromCart({ id, title, price, img })
                : addItemToCart({ id, title, price, img })
              }
            >
              <Ionicons 
                name={isItemInCart ? 'remove' : 'add'} 
                color='white' 
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '50%',
    padding: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2d3436',
  },
  tag: {
    fontSize: 14,
    color: '#636e72',
  },
  priceActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
  },
  cartButton: {
    backgroundColor: '#0984e3',
    borderRadius: 8,
    padding: 8,
  },
  removeButton: {
    backgroundColor: '#d63031',
  },
});

export default ProductCard;
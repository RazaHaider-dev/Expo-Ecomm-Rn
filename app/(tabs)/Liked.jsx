import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorite } from '../Reducers/CarReducers';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';


function Liked() {
  const favorites = useSelector((state) => state.cart.favorites);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

 
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cartItem}>
      <Image source={{ uri: item.img }} style={styles.itemImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeFromFavorite(item))}
        style={styles.removeButton}
      >
        <MaterialIcons name="favorite" size={24} color="#FF6B6B" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header1}>
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

      <View style={styles.container}>
        {/* <Text style={styles.header}>Favorites</Text> */}
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="favorite-border" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>No favorite items yet.</Text>
              <TouchableOpacity style={styles.exploreButton}>
                <Link href={'Products'}>
                <Text style={styles.exploreButtonText}>Explore Products</Text>
                </Link>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header1: {
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


  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    marginTop: 40,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  itemInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: '500',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#999999',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  exploreButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop:50
  },
});

export default Liked;
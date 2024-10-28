import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../Reducers/CarReducers';
import { Link } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    // Ensure price is always a number
    const price = typeof item.price === 'number' ? item.price : 0;
    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.img }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => dispatch(decrementQuantity(item))} style={styles.quantityButton}>
              <Feather name="minus" size={18} color="#333" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => dispatch(incrementQuantity(item))} style={styles.quantityButton}>
              <Feather name="plus" size={18} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(item))} style={styles.removeButton}>
          <Feather name="trash-2" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    );
  };
  
  const totalPrice = cart.reduce((sum, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0;
    return sum + price * quantity;
  }, 0);

  const safeTotalPrice = isNaN(totalPrice) ? 0 : totalPrice;

  return (
    <>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Cart</Text>
          <Text>This is your personalized cart</Text>
        </View>
        <View style={styles.headerIcons}>
          <Link href={'./Liked'} asChild>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#333" />
            </TouchableOpacity>
          </Link>
          <Link href={'CartPage'} asChild>
            <TouchableOpacity style={styles.cartIcon}>
              <View style={styles.cartContent}>
                <Ionicons name="cart-outline" size={24} color="#333" />
                {cart.length > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{cart.length}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
      
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Your Cart</Text>
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalText}>Total</Text>
              <TouchableOpacity>
                <Text style={styles.taxText}>All Tax Included<Text style={styles.asterisk}>*</Text></Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.totalAmount}>${safeTotalPrice.toFixed(2)}</Text>
          </View>
          <Link href={'../Comps/CheackOutForm'} asChild>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 16,
    color: '#1C1C1E',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: '#3A3A3C',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#E9E9EB',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  taxText: {
    fontSize: 14,
    color: '#3A3A3C',
  },
  asterisk: {
    color: '#FF3B30',
    fontWeight: '900',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
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

});

export default Cart;
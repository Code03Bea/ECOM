import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { CartItem } from '@/context/CartContext';
import { Ionicons } from '@expo/vector-icons';

interface CartItemComponentProps {
  item: CartItem;
  onRemove: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onIncrease: (productId: string) => void;
}

export function CartItemComponent({
  item,
  onRemove,
  onDecrease,
  onIncrease,
}: CartItemComponentProps) {
  const subtotal = item.product.price * item.quantity;

  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove ${item.product.name}?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => onRemove(item.product.id),
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: item.product.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{item.product.name}</Text>
        <Text style={styles.price}>${item.product.price.toFixed(2)}</Text>
        
        <View style={styles.quantitySection}>
          <Text style={styles.subtotalLabel}>Subtotal: ${subtotal.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onDecrease(item.product.id)}
          >
            <Ionicons name="remove" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onIncrease(item.product.id)}
          >
            <Ionicons name="add" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
        >
          <Ionicons name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  subtotalLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  quantitySection: {
    marginTop: 4,
  },
  actions: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantity: {
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    marginTop: 8,
  },
});

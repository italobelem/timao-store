import { Injectable, computed, signal, effect } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<CartItem[]>(this.loadCart());

  totalItems = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));
  totalValue = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.preco * item.quantity), 0));

  constructor() {
    effect(() => localStorage.setItem('cart', JSON.stringify(this.cartItems())));
  }

  private loadCart(): CartItem[] {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        return items.map(i => i.product.id === product.id 
          ? { ...i, quantity: i.quantity + 1, subTotal: (i.quantity + 1) * i.product.preco } : i);
      }
      return [...items, { product, quantity: 1, subTotal: product.preco }];
    });
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) return; 

    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity, subTotal: quantity * item.product.preco }
          : item
      )
    );
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(i => i.product.id !== id));
  }
  
  clearCart() {
    this.cartItems.set([]); 
  }
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent { 
  cartService = inject(CartService);
  readonly productService = inject(ProductService);
  readonly fb = inject(FormBuilder);
  readonly router = inject(Router); 

  addItemForm: FormGroup = this.fb.group({
    productId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  handleRemoveItem(item: CartItem) {
    if(confirm(`Tem a certeza que deseja remover "${item.product.nome}" do carrinho?`)) {
      this.cartService.removeFromCart(item.product.id!);
    }
  }

  onClearCart() {
    if (confirm('Tem a certeza que deseja esvaziar todo o carrinho?')) {
      this.cartService.clearCart();
    }
  }

  finalizeOrder() {
    if (this.cartService.cartItems().length === 0) return;
    
    this.cartService.clearCart();
    this.router.navigate(['/checkout/success']);
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.product.id!, item.quantity + 1);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.product.id!, item.quantity - 1);
    }
  }

  onQuickAdd() {
    if (this.addItemForm.invalid) return;

    const { productId, quantity } = this.addItemForm.value;

    this.productService.getProductById(Number(productId)).subscribe({
      next: (res) => {
        const product = res.data || res;
        if (product) {
          this.cartService.addToCart(product);
          
          const currentItem = this.cartService.cartItems().find(i => i.product.id === product.id);
          if (currentItem && quantity > 1) {
             const newQuantity = currentItem.quantity + (quantity - 1);
             this.cartService.updateQuantity(product.id!, newQuantity);
          }

          this.addItemForm.reset({ quantity: 1 });
          alert('Produto adicionado com sucesso!');
        } else {
          alert('Produto não encontrado!');
        }
      },
      error: () => alert('Erro ao buscar produto. Verifique o ID.')
    });
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductTableComponent],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  
  readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);
  readonly router = inject(Router);

  ngOnInit() { 
    this.loadProducts(); 
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data || []; 
        console.log('Produtos carregados:', this.products);
      },
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  handleAddToCart(p: Product) { 
    this.cartService.addToCart(p);
  }

  navigateToAdd() { 
    this.router.navigate(['/products/new']); 
  }

  handleEdit(p: Product) {
    this.router.navigate(['/products/edit', p.id]);
  }

  handleDelete(p: Product) {
    if(confirm(`Deseja realmente excluir ${p.nome}?`)) {
      this.productService.deleteProduct(p.id!).subscribe({
        next: () => {
          this.loadProducts(); 
        },
        error: (err) => alert('Erro ao excluir.')
      });
    }
  }
}
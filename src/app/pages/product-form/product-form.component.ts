import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], 
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean = false; 
  productId: number | null = null;

  readonly fb = inject(FormBuilder);
  readonly productService = inject(ProductService);
  readonly route = inject(ActivatedRoute); 
  readonly router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      codigoBarras: [''],
      preco: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.productId = idParam ? Number(idParam) : null;
    
    if (this.productId) {
      this.isEditMode = true;
      
      this.productService.getProductById(this.productId).subscribe({
        next: (res) => {
          const product = res.data || res;
          
          this.form.patchValue({
            nome: product.nome,
            codigoBarras: product.codigoBarras,
            preco: product.preco
          });
        },
        error: (err) => {
          console.error("Erro ao carregar produto para edição", err);
          alert('Erro ao carregar dados do produto.');
        }
      });
    }
  }

    onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const productToSend: Product = {
      nome: formValue.nome,
      codigoBarras: formValue.codigoBarras,
      preco: Number(formValue.preco),
      category: formValue.category
    };

    if (formValue.categoryId && Number(formValue.categoryId) > 0) {
      productToSend.category = { id: Number(formValue.categoryId) };
    } else {
      productToSend.category = null;
    }

    console.log('Enviando dados:', productToSend); 

    const request = this.isEditMode 
      ? this.productService.updateProduct(this.productId!, productToSend)
      : this.productService.createProduct(productToSend);

    request.subscribe({
      next: () => {
        alert(this.isEditMode ? 'Produto atualizado!' : 'Produto cadastrado!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        const mensagemErro = err.error?.message || err.error?.error || 'Erro ao salvar produto.';
        alert(mensagemErro);
      }
    });
  }
}
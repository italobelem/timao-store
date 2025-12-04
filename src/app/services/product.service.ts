import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly apiUrl = 'http://localhost:8080/v1/produtos';
  readonly http = inject(HttpClient);

  getProducts(): Observable<ApiResponse<Product[]>> { 
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/listar`); 
  }

  getProductById(id: number): Observable<ApiResponse<Product>> { 
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/listar/${id}`); 
  }

  createProduct(product: Product): Observable<ApiResponse<Product>> { 
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/criar`, product); 
  }

  updateProduct(id: number, product: Product): Observable<ApiResponse<Product>> { 
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/atualizar/${id}`, product); 
  }

  deleteProduct(id: number): Observable<ApiResponse<void>> { 
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/deletar/${id}`); 
  }
}
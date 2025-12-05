import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { ApiResponse } from '../models/api-response.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/v1/produtos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve buscar lista de produtos (GET)', () => {
    const mockResponse: ApiResponse<Product[]> = { message: 'Ok', data: [] };

    service.getProducts().subscribe(res => {
      expect(res.data).toEqual([]);
    });

    const req = httpMock.expectOne(`${apiUrl}/listar`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve buscar produto por ID (GET)', () => {
    const mockResponse: ApiResponse<Product> = { 
        message: 'Ok', 
        data: { id: 1, nome: 'Teste', preco: 10, codigoBarras: '111' } 
    };

    service.getProductById(1).subscribe(res => {
      expect(res.data.id).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/listar/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve criar um produto (POST)', () => {
    const newProduct: Product = { nome: 'Novo', preco: 100, codigoBarras: '99' };
    const mockResponse: ApiResponse<Product> = { message: 'Criado', data: { ...newProduct, id: 1 } };

    service.createProduct(newProduct).subscribe(res => {
      expect(res.data.id).toBe(1);
    });

    const req = httpMock.expectOne(`${apiUrl}/criar`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve atualizar um produto (PUT)', () => {
    const product: Product = { id: 1, nome: 'Editado', preco: 150, codigoBarras: '99' };
    
    service.updateProduct(1, product).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/atualizar/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Atualizado', data: product });
  });

  it('deve deletar um produto (DELETE)', () => {
    service.deleteProduct(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/deletar/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deletado', data: null });
  });
});
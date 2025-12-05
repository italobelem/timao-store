import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../models/product.model';
import { ApiResponse } from '../../models/api-response.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const mockProducts: Product[] = [
    { id: 1, nome: 'Produto A', preco: 10, codigoBarras: '111' },
    { id: 2, nome: 'Produto B', preco: 20, codigoBarras: '222' }
  ];

  beforeEach(async () => {
    const pSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    const cSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent], 
      providers: [
        provideRouter([]), 
        { provide: ProductService, useValue: pSpy },
        { provide: CartService, useValue: cSpy }
      ]
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;

    const response: ApiResponse<Product[]> = { message: 'Ok', data: mockProducts };
    productServiceSpy.getProducts.and.returnValue(of(response));

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    
    spyOn(globalThis, 'confirm').and.returnValue(true); 
    spyOn(globalThis, 'alert'); 

    fixture.detectChanges(); 
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar a lista de produtos ao iniciar (ngOnInit)', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.products[0].nome).toBe('Produto A');
  });

  it('deve chamar addToCart quando o método for executado', () => {
    const product = mockProducts[0];
    component.handleAddToCart(product);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(product);
  });

  it('deve chamar deleteProduct e recarregar a lista ao excluir', () => {
    productServiceSpy.deleteProduct.and.returnValue(of({ message: 'Deleted', data: undefined }));
    
    component.handleDelete(mockProducts[0]);

    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith(1);
    
    expect(productServiceSpy.getProducts).toHaveBeenCalledTimes(2); 
  });
});
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    nome: 'Teste Phone',
    preco: 1000,
    codigoBarras: '123'
  };

  beforeEach(() => {
    let store: { [key: string]: string } = {};
    
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });
    
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    
    spyOn(localStorage, 'clear').and.callFake(() => {
      store = {};
    });

    TestBed.configureTestingModule({
      providers: [CartService]
    });
    
    service = TestBed.inject(CartService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve adicionar um novo item ao carrinho', () => {
    service.addToCart(mockProduct);
    
    const items = service.cartItems();
    expect(items.length).toBe(1);
    expect(items[0].product.id).toBe(1);
    expect(items[0].quantity).toBe(1);
    expect(items[0].subTotal).toBe(1000);
  });

  it('deve incrementar a quantidade se o item já existe', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);

    const items = service.cartItems();
    expect(items.length).toBe(1); 
    expect(items[0].quantity).toBe(2); 
    expect(items[0].subTotal).toBe(2000);
  });

  it('deve calcular o total de itens e valor total corretamente', () => {
    const product2: Product = { id: 2, nome: 'Mouse', preco: 50, codigoBarras: '999' };

    service.addToCart(mockProduct); 
    service.addToCart(product2);    
    service.addToCart(product2);    

    expect(service.totalItems()).toBe(3);
    
    expect(service.totalValue()).toBe(1100);
  });

  it('deve atualizar a quantidade de um item específico', () => {
    service.addToCart(mockProduct);
    
    service.updateQuantity(1, 5);

    const items = service.cartItems();
    expect(items[0].quantity).toBe(5);
    expect(items[0].subTotal).toBe(5000);
    expect(service.totalValue()).toBe(5000);
  });

  it('não deve atualizar para quantidade zero ou negativa', () => {
    service.addToCart(mockProduct);
    
    service.updateQuantity(1, 0); 
    expect(service.cartItems()[0].quantity).toBe(1);

    service.updateQuantity(1, -5); 
    expect(service.cartItems()[0].quantity).toBe(1); 
  });

  it('deve remover item do carrinho', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(1);

    expect(service.cartItems().length).toBe(0);
    expect(service.totalValue()).toBe(0);
  });

  it('deve limpar o carrinho', () => {
    service.addToCart(mockProduct);
    service.clearCart();

    expect(service.cartItems().length).toBe(0);
  });

  it('deve salvar no localStorage automaticamente (Effect)', () => {
    service.addToCart(mockProduct);
    
    TestBed.flushEffects();

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', jasmine.stringMatching('Teste Phone'));
  });
});
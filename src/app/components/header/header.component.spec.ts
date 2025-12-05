import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router'; 
import { CartService } from '../../services/cart.service';
import { signal } from '@angular/core';

class MockCartService {
  totalItems = signal(0);
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: MockCartService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useClass: MockCartService } 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    
    cartService = TestBed.inject(CartService) as unknown as MockCartService;
  });

  it('deve criar o componente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deve mostrar o badge quando houver itens', () => {
    cartService.totalItems.set(5);
    
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge.textContent).toContain('5');
  });
});
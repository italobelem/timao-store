import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutSuccessComponent } from './checkout-success.component';
import { provideRouter } from '@angular/router';

describe('CheckoutSuccessComponent', () => {
  let component: CheckoutSuccessComponent;
  let fixture: ComponentFixture<CheckoutSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutSuccessComponent],
      providers: [
        provideRouter([]) 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
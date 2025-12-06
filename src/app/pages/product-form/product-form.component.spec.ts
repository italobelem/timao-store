import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProductById', 'createProduct', 'updateProduct']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ProductFormComponent 
      ],
      providers: [
        { provide: ProductService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null 
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    
    spyOn(globalThis, 'alert');
    
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve iniciar formulário com valores default', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('nome')?.value).toBe('');
    expect(component.form.get('codigoBarras')?.value).toBe('');
    expect(component.form.get('preco')?.value).toBe(0);
  });

  it('deve ser inválido se o nome for vazio', () => {
    const nomeControl = component.form.get('nome');
    nomeControl?.setValue('');
    expect(component.form.valid).toBeFalsy();
    expect(nomeControl?.errors?.['required']).toBeTruthy();
  });

  it('deve ser inválido se preco for menor ou igual a 0', () => {
    const precoControl = component.form.get('preco');
    
    precoControl?.setValue(0);
    expect(component.form.valid).toBeFalsy();
    
    precoControl?.setValue(-10);
    expect(component.form.valid).toBeFalsy();

    component.form.get('nome')?.setValue('Produto Teste');
    component.form.get('codigoBarras')?.setValue('123');
    precoControl?.setValue(10);
    expect(component.form.valid).toBeTruthy();
  });

  it('deve chamar createProduct ao enviar um formulário válido ao registrar um produto', () => {
    component.form.patchValue({
      nome: 'Produto Novo',
      codigoBarras: '111222',
      preco: 100
    });
    
    productServiceSpy.createProduct.and.returnValue(of({ message: 'Success', data: {} } as any));

    component.onSubmit();

    expect(productServiceSpy.createProduct).toHaveBeenCalled();
    
    const expectedPayload = {
      nome: 'Produto Novo',
      codigoBarras: '111222',
      preco: 100
    };
    
    expect(productServiceSpy.createProduct).toHaveBeenCalledWith(jasmine.objectContaining(expectedPayload));
  });
});
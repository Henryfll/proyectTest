import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';

xdescribe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['obtenerProductos']);
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.obtenerProductos).toHaveBeenCalled();
  });
});

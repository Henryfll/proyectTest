import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { ProductService } from '../../services/product.service';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  const today=new Date();
  let mockData:any;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['obtenerProductos', 'crearProducto','actualizarProducto','eliminarProducto','verificarIdProducto']);
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ],
      imports:[FormsModule]
    })
    .compileComponents();
        mockData ={data:[{
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: today,
          date_revision: new Date(today.setFullYear(today.getFullYear() + 1))},
          {
            id: 'trj-crd2',
            name: 'Tarjetas de Debito',
            description: 'Tarjeta de consumo bajo la modalidad de crédito',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: today,
            date_revision: new Date(today.setFullYear(today.getFullYear() + 1))},
        ]} ;
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productService.obtenerProductos.and.returnValue(of(mockData));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.obtenerProductos).toHaveBeenCalled();
  });

  it('should get products on successful API call', async () => {
    productService.obtenerProductos.and.returnValue(of(mockData));
    await component.ngOnInit();
    expect(component.listaFiltrada).toEqual(mockData.data);
  });


  describe('test new product',()=>{
    it('should create a new product form', () => {
      component.nuevoProducto();
      expect(component.frmProducto instanceof FormGroup).toBeTruthy();
      expect(component.esNuevo).toBeTrue();
    });
  });

  describe('test update product',()=>{
    it('should update a product', () => {
      const mockProduct: Product = { id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))};

      component.editarProducto(mockProduct);
      expect(component.frmProducto instanceof FormGroup).toBeTruthy();
      expect(component.esEdicion).toBeTrue();
    });
  });


  describe('test reload form',()=>{
    it('should reload form', () => {
      productService.obtenerProductos.and.returnValue(of(mockData));
      component.listarProductos();
      expect(productService.obtenerProductos).toHaveBeenCalled();
      expect(component.esEdicion).toBeFalse();
      expect(component.esNuevo).toBeFalse();
    });
  });


  describe('test save product',()=>{
    it('should save new product', () => {
      component.esNuevo=true;
      component.nuevoProducto();
      component.frmProducto.patchValue({
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      });
      productService.crearProducto.and.returnValue(of(mockData));

      component.guardarProducto();
      expect(productService.crearProducto).toHaveBeenCalled();
    });

    it('should update product', () => {
      const mockProduct: Product = { id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))};

      component.editarProducto(mockProduct);
      productService.actualizarProducto.and.returnValue(of(mockProduct));
      component.guardarProducto();
      expect(productService.actualizarProducto).toHaveBeenCalled();
    });
  });

  describe('test verification product id',()=>{
    it('should return exits id', () => {
      const mockProduct: Product = { id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))};
      component.nuevoProducto();
      component.frmProducto.patchValue({
        id: 'trj-crd'
      });
      productService.verificarIdProducto.and.returnValue(of(mockProduct));
      component.verificarIdExistente();
      expect(productService.verificarIdProducto).toHaveBeenCalled();
      expect(component.frmProducto.get("id")?.value).toBe(null);
    });

    it('should return not exits id', () => {
      component.nuevoProducto();
      component.frmProducto.patchValue({
        id: 'trj-crd'
      });
      productService.verificarIdProducto.and.returnValue(of(null));
      component.verificarIdExistente();
      expect(productService.verificarIdProducto).toHaveBeenCalled();
      expect(component.frmProducto.get("id")?.value).toBe('trj-crd');
    });

  });

  describe('test delete product',()=>{
    it('should delete a product', () => {
      const mockProduct: Product = { id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))};

      productService.eliminarProducto.and.returnValue(of(mockProduct));
      component.eliminarProducto(mockProduct);
      expect(productService.eliminarProducto).toHaveBeenCalled();
    });

  });

  describe('test paginator',()=>{
    it('should paginator product table', () => {
      component.selectedValue=1;
      productService.obtenerProductos.and.returnValue(of(mockData));
      component.listarProductos();
      component.onSelectPaginator();
      expect(component.listaFiltrada.length).toBe(1);
    });

  });

  describe('test search by name',()=>{
    it('should find a product', () => {
      component.nombre='Tarjetas de Crédito';
      productService.obtenerProductos.and.returnValue(of(mockData));
      component.listarProductos();
      component.buscarPorNombre();
      expect(component.listaFiltrada.length).toBe(1);
    });
    it('should find a product', () => {
      component.nombre='Producto Nuevo';
      productService.obtenerProductos.and.returnValue(of(mockData));
      component.listarProductos();
      component.buscarPorNombre();
      expect(component.listaFiltrada.length).toBe(0);
    });
    it('should name empty', () => {
      component.nombre='';
      productService.obtenerProductos.and.returnValue(of(mockData));
      component.listarProductos();
      component.buscarPorNombre();
      expect(component.listaFiltrada.length).toBe(2);
    });
  });
});

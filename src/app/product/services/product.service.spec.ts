import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../interfaces/product';
import { environment } from '../../../environments/environment';
import { HttpStatusCode } from '@angular/common/http';

describe('ProductService', () => {
  let productService: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ProductService]
    });
    productService = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

    it('should be  created',()=>{
      expect(productService).toBeTruthy();
    });

    describe('test for get all products',()=>{
      it('return products list',(doneFn)=>{
        const today=new Date();
        const mockProducts: Product[] = [
          {
            id: 'trj-crd',
            name: 'Tarjetas de Crédito',
            description: 'Tarjeta de consumo bajo la modalidad de crédito',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: today,
            date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
          },
          {
            id: 'trj-crd2', name: 'Tarjetas de Crédito',
            description: 'Tarjeta de consumo bajo la modalidad de crédito',
            logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
            date_release: today,
            date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
          }
        ];


        productService.obtenerProductos().subscribe((data)=>{
          expect(data).toEqual(mockProducts);
          doneFn();
        });
        const url =`${environment.url_backend}/products`
        const request= httpController.expectOne(url);
        request.flush(mockProducts);
      });

      it('should return the right msg when the status code is 404', (doneFn) => {
        const msgError = '404 message';
        const mockError = {
          status: HttpStatusCode.NotFound,
          statusText: msgError
        };
        productService.obtenerProductos()
        .subscribe({
          error: (error) => {
            expect(error.error).toEqual(msgError);
            doneFn();
          }
        });

        const url =`${environment.url_backend}/products`
        const req = httpController.expectOne(url);
        expect(req.request.method).toEqual('GET');
        req.flush(msgError, mockError);
      });



    });
    describe('test for create new product', () => {
      it('should return a new product', (doneFn) => {
        const today=new Date();
        const mockData:Product ={
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: today,
          date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
        } ;
        const dto: Product = {
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: today,
          date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
        };
        productService.crearProducto(dto)
        .subscribe(data => {
          expect(data).toEqual(mockData);
          doneFn();
        });

        const url = `${environment.url_backend}/products`;
        const req = httpController.expectOne(url);
        req.flush(mockData);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');
      });

      it('should return the right msg when the status code is 404', (doneFn) => {
        const today=new Date();
        const mockData:Product ={
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: today,
          date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
        } ;
        const msgError = '404 message';
        const mockError = {
          status: HttpStatusCode.NotFound,
          statusText: msgError
        };
        const dto: Product = {
          id: 'trj-crd',
          name: 'Tarjetas de Crédito',
          description: 'Tarjeta de consumo bajo la modalidad de crédito',
          logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
          date_release: today,
          date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
        }

        productService.crearProducto(dto)
        .subscribe({
          error: (error) => {
            expect(error.error).toEqual(msgError);
            doneFn();
          }
        });

        const url =`${environment.url_backend}/products`
        const req = httpController.expectOne(url);
        expect(req.request.body).toEqual(dto);
        expect(req.request.method).toEqual('POST');
        req.flush(msgError, mockError);
      });

    });

    describe('test for update product', () => {
      it('should update a product', (doneFn) => {
      const today = new Date();
      const mockData:Product ={
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      } ;
      const dto = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      };
      const productId = 'trj-crd';
      productService.actualizarProducto(dto)
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });
      const url = `${environment.url_backend}/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      req.flush(mockData);
    });

    it('should return the right msg when the status code is 404', (doneFn) => {
      const today=new Date();
      const mockData:Product ={
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      } ;
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      };
      const dto: Product = {
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      };
      const productId = 'trj-crd';
      productService.actualizarProducto(dto)
      .subscribe({
        error: (error) => {
          expect(error.error).toEqual(msgError);
          doneFn();
        }
      });

      const url = `${environment.url_backend}/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('PUT');
      req.flush(msgError, mockError);
    });
  });


  describe('test for delete', () => {
    it('should delete a product', (doneFn) => {
      const mockData = true;
      const productId = '1trj-crd';
      productService.eliminarProducto(productId)
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });
      const url = `${environment.url_backend}/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });

    it('should return the right msg when the status code is 404', (doneFn) => {
      const productId = '1trj-crd';
      const msgError = '404 message';
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError
      };

      productService.eliminarProducto(productId)
      .subscribe({
        error: (error) => {
          expect(error.error).toEqual(msgError);
          doneFn();
        }
      });

      const url = `${environment.url_backend}/products/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(msgError, mockError);
    });
  });


  describe('test for getOne', () => {
    it('should return a product', (doneFn) => {
      const today = new Date();
      const mockData:Product ={
        id: 'trj-crd',
        name: 'Tarjetas de Crédito',
        description: 'Tarjeta de consumo bajo la modalidad de crédito',
        logo: 'https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg',
        date_release: today,
        date_revision: new Date(today.setFullYear(today.getFullYear() + 1))
      } ;
      const productId = 'trj-crd';

      productService.verificarIdProducto(productId)
      .subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // http config
      const url = `${environment.url_backend}/products/verification/${productId}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    });

        it('should return the right msg when the status code is 404', (doneFn) => {
            const productId = 'trj-crd';
            const msgError = '404 message';
            const mockError = {
              status: HttpStatusCode.NotFound,
              statusText: msgError
            };
            productService.verificarIdProducto(productId)
            .subscribe({
              error: (error) => {
                expect(error.error).toEqual(msgError);
                doneFn();
              }
            });

            const url = `${environment.url_backend}/products/verification/${productId}`;
            const req = httpController.expectOne(url);
            expect(req.request.method).toEqual('GET');
            req.flush(msgError, mockError);
          });
     });
    afterEach(() => {
      httpController.verify();
    });

});

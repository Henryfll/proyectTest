import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url_backend = environment.url_backend;
  constructor(
    public _http:HttpClient
  ) { }


  obtenerProductos(){
    let url_ws=`${this.url_backend}/products`;
    return this._http.get<any>(url_ws);
  }
  crearProducto(productoNuevo:Product){
    let producto={
      "id":productoNuevo.id,
      "name":productoNuevo.name,
      "description":productoNuevo.description,
      "logo":productoNuevo.logo,
      "date_release":productoNuevo.date_release,
      "date_revision":productoNuevo.date_revision
    };
    let url_ws=`${this.url_backend}/products`;
   return this._http.post<any>(url_ws,producto);
  }
  actualizarProducto(productoActualizar:Product){
    let producto={
      "name":productoActualizar.name,
      "description":productoActualizar.description,
      "logo":productoActualizar.logo,
      "date_release": productoActualizar.date_release,
      "date_revision": productoActualizar.date_revision
    };
    let url_ws=`${this.url_backend}/products/${productoActualizar.id}`;
   return this._http.put<any>(url_ws,producto);
  }

  eliminarProducto(id:string){
    let url_ws=`${this.url_backend}/products/${id}`;
   return this._http.delete<any>(url_ws);
  }

  verificarIdProducto(id:string){
    let url_ws=`${this.url_backend}/products/verification/${id}`;
   return this._http.get<any>(url_ws);
  }
}

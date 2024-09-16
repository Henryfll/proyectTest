import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  private listaProductos:Product[]=[];
  listaFiltrada:Product[]=[];
  public frmProducto!: FormGroup;
  esNuevo:boolean=false;
  esEdicion:boolean=false;
  minDate: string;
  selectedValue: number = 5;
  nombre: string='';

  constructor(
    private readonly fb: FormBuilder,
    private _productoService:ProductService
  ) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const year = today.getFullYear();
    this.minDate = `${year}-${month}-${day}`;

  }

  ngOnInit(): void {
    this.esNuevo=false;
    this.esEdicion=false;
    this.listarProductos();
  }

  listarProductos(){
    this._productoService.obtenerProductos().subscribe(
      (respuesta:any)=>{
        this.listaProductos=respuesta.data;
        this.onSelectPaginator();
      },
    (error)=>{
      console.log("Error: ", error);
    }
    );
  }
  nuevoProducto(){
    this.esNuevo=true;
    this.frmProducto=this.fb.group(
      {
        id:[null,[Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        name:[null,[Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
        description:[null,[Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo:[null,[Validators.required]],
        date_release: [null,[Validators.required]],
        date_revision:[{value:null,disabled:true},[Validators.required]]
      }
    );

    this.frmProducto.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const newDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1));
        this.frmProducto.get("date_revision")?.setValue(newDate.toISOString().split('T')[0]);
      }
    });
  }

  editarProducto(producto:Product){
    this.esEdicion=true;
    this.frmProducto=this.fb.group(
      {
        id:[{value:producto.id, disabled:true},[Validators.required]],
        name:[producto.name,[Validators.required,Validators.minLength(5), Validators.maxLength(100)]],
        description:[producto.description,[Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
        logo:[producto.logo,[Validators.required]],
        date_release: [producto.date_release,[Validators.required]],
        date_revision:[{value:producto.date_revision,disabled:true},[Validators.required]]
      }
    );

    this.frmProducto.get('date_release')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedDate = new Date(value);
        const newDate = new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 1));
        this.frmProducto.get("date_revision")?.setValue(newDate.toISOString().split('T')[0]);
      }
    });
  }

  reiniciarFormulario(){
    this.esEdicion=false;
    this.esNuevo=false;
    this.listarProductos();
  }

  guardarProducto(){
    let producto:Product={
      id: this.frmProducto.get("id")!.value,
      name: this.frmProducto.get("name")!.value,
      description: this.frmProducto.get("description")?.value,
      logo: this.frmProducto.get("logo")?.value,
      date_release: this.frmProducto.get("date_release")?.value,
      date_revision: this.frmProducto.get("date_revision")?.value,
    };
    if (this.esNuevo) {
      this._productoService.crearProducto(producto).subscribe(
        (respuesta)=>{
          Swal.fire("Producto creado", "","info");
          this.reiniciarFormulario();
        },
        (error)=>{
          console.log(error);
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
    } else {
      this._productoService.actualizarProducto(producto).subscribe(
        (respuesta)=>{
          Swal.fire("Producto Actualizado","", "info");
          this.reiniciarFormulario();
        },
        (error)=>{
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
    }
  }


  verificarIdExistente(){
    let id:string=this.frmProducto.get("id")?.value;
    this._productoService.verificarIdProducto(id).subscribe(
      (respuesta)=>{
        if (respuesta) {
          Swal.fire("El id del producto ya existe!","","warning");
          this.frmProducto.get("id")?.setValue(null);
        }
      },
      (error)=>{
        Swal.fire(`Error: ${error}`,"", "error");
      }
    );
  }

  eliminarProducto(producto:Product){
      this._productoService.eliminarProducto(producto.id).subscribe(
        (respuesta)=>{
            Swal.fire("Producto Eliminado!","","success");
            this.listarProductos();
        },
        (error)=>{
          Swal.fire(`Error: ${error}`,"", "error");
        }
      );
  }

  onSelectPaginator() {
    this.listaFiltrada=this.listaProductos.slice(0,this.selectedValue);
  }

  buscarPorNombre(){
      if(this.nombre==''){
        this.listarProductos();
      }else{
        let productoBusqueda=this.listaProductos.find( producto=> producto.name==this.nombre);
        if(productoBusqueda!= undefined){
          this.listaFiltrada=[productoBusqueda];
        }else{
          this.listaFiltrada=[];
        }
      }
  }
}

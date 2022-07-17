import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../service/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  productos: Producto[] = [];
  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }
  cargarProductos(): void{
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  borrar(id?: number){
    if (id != undefined){
    this.productoService.delete(id).subscribe(
      data => {
        this.toastr.success('Producto Eliminado','OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        this.toastr.error(err.error.mensaje,'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
      }
    );
    }
  }
}

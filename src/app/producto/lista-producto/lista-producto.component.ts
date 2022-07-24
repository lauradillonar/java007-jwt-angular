import { TokenService } from './../../service/token.service';
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
  isAdmin = false; 

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.isAdmin = this.tokenService.isAdmin();
  }
  cargarProductos(): void {
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  borrar(id?: number) {
    if (id != undefined) {
      this.productoService.delete(id).subscribe(
        data => {
          this.toastr.success('Producto Eliminado', 'OK', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
          this.cargarProductos();
        },
        err => {
          console.log(err);
          this.toastr.error(err.error.message, 'Fail', {
            timeOut: 3000,
            positionClass: 'toast-top-center'
          });
        }
      );
    }
  }
}

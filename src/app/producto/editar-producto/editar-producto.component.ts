import { ToastrService } from 'ngx-toastr';
import { ProductoService } from './../../service/producto.service';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: Producto = new Producto('',0);

  constructor(
    private productoService: ProductoService,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.productoService.detail(id).subscribe(
      data => {
        this.producto = data;
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      }
    );
  }

  onUpdate(): void{
    const id = this.activateRoute.snapshot.params['id'];
    this.productoService.update(id, this.producto).subscribe(
      data => {
        this.toastr.success('Producto Actualizado','OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/lista']);
      }
    );
  }
}

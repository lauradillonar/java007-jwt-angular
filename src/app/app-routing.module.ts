import { ProdGuardService as guard} from './guards/prod-guard.service';
import { RegistroComponent } from './auth/registro/registro.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './index/index.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './producto/nuevo-producto/nuevo-producto.component';
import { DetalleProductoComponent } from './producto/detalle-producto/detalle-producto.component';
import { ListaProductoComponent } from './producto/lista-producto/lista-producto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'lista', component: ListaProductoComponent, canActivate: [guard], data: {
    expectedRol: ['admin', 'user']
  }},
  {path: 'detalle/:id', component: DetalleProductoComponent, canActivate: [guard], data: {
    expectedRol: ['admin', 'user']
  }},
  {path: 'nuevo', component: NuevoProductoComponent, canActivate: [guard], data: {
    expectedRol: ['admin']
  }},
  {path: 'editar/:id', component: EditarProductoComponent, canActivate: [guard], data: {
    expectedRol: ['admin']
  }},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

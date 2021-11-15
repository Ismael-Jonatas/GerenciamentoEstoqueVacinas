import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UsuarioCreateComponent } from './views/usuario/usuario-create/usuario-create.component';
import { LoginComponent } from './views/login/login.component';
import { FornecedorCreateComponent } from "./views/fornecedor/fornecedor-create/fornecedor-create.component";
import { VacinaCreateComponent } from "./views/vacina/vacina-create/vacina-create.component";
import { LoteCreateComponent } from "./views/lote/lote-create/lote-create.component";
import {UsuarioComponent} from "./components/template/usuario/usuario.component";
import {UsuarioReadComponent} from "./views/usuario/usuario-read/usuario-read.component";

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"usuario",
    component: UsuarioCreateComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"fornecedor",
    component: FornecedorCreateComponent
  },
  {
    path:"tipovacina",
    component: VacinaCreateComponent
  },
  {
    path:"lotevacina",
    component: LoteCreateComponent
  },
  {
    path:"gerenciarusuario",
    component: UsuarioComponent
  },
  {
    path:"usuarios",
    component: UsuarioReadComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

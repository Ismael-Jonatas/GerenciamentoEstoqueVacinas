import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { UsuarioCreateComponent } from './views/usuario/usuario-create/usuario-create.component';
import { LoginComponent } from './views/login/login.component';
import { FornecedorCreateComponent } from "./views/fornecedor/fornecedor-create/fornecedor-create.component";
import { TipoVacinaCreateComponent } from "./views/vacina/vacina-create/vacina-create.component";
import { LoteCreateComponent } from "./views/lote/lote-create/lote-create.component";

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
    component: TipoVacinaCreateComponent
  },
  {
    path:"lotevacina",
    component: LoteCreateComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

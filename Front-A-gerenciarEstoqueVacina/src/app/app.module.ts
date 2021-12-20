import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { UsuarioCreateComponent } from './views/usuario/usuario-create/usuario-create.component';
import { FornecedorCreateComponent } from "./views/fornecedor/fornecedor-create/fornecedor-create.component";
import { TipoVacinaCreateComponent } from "./views/vacina/vacina-create/vacina-create.component";
import { LoteCreateComponent } from "./views/lote/lote-create/lote-create.component";

import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsuarioReadComponent } from './views/usuario/usuario-read/usuario-read.component';
import { UsuarioComponent } from './components/template/usuario/usuario.component';
import { LoginService } from './service/login.service';
import { RegistroSaidaComponent } from './views/Registro/registro-saida/registro-saida.component';
import { RegistroEntradaComponent } from './views/Registro/registro-entrada/registro-entrada.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    UsuarioCreateComponent,
    FornecedorCreateComponent,
    TipoVacinaCreateComponent,
    LoteCreateComponent,
    UsuarioReadComponent,
    UsuarioComponent,
    LoteCreateComponent,
    RegistroSaidaComponent,
    RegistroEntradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Usuario } from 'src/app/model/usuario.model';
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private loginService: LoginService) { }

  usuarioLogado: Usuario = this.loginService.getUsuarioLogado();

  ngOnInit(): void {
    setInterval(() => {
      this.setUsuarioLogado();
    }, 500);
  }

  setUsuarioLogado() {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
  }

  logout():void{
    if (this.loginService.getUsuarioLogado().id != 0){
      this.showMessage("Sessão Encerrada!")
      this.loginService.logout();
    } else {
      this.showMessage("Não ha usuário logado!")
    }


  }

  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:1500,
      horizontalPosition:"center",
      verticalPosition:"top"})
  }

  isPageLogin(): boolean {
    return window.location.pathname === '/login'
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginPublisher } from 'src/app/service/login-publisher.service';
import {Usuario} from "../../model/usuario.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    nome:'',
    cpf:'',
    matricula:'',
    senha:'',
    isAdmin:false,
  }
  usuarioLogado: Usuario = null;
  loaded: boolean = false;

  constructor(private loginPublisher: LoginPublisher, private router: Router ) { }

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
    if(usuarioLogado)
      this.router.navigate(['/']);
    else
      this.loaded = true;
  }

  fazerLogin(): void {
    this.loginPublisher.fazerLogin(this.usuario).then(isLogado =>{
      if(isLogado)
        this.loginPublisher.showMessage("Logado com Sucesso!");
      else
        this.loginPublisher.showMessage("Usuario Inexistente!");
    })

  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}

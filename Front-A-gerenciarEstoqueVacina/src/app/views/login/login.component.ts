import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
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


  constructor(private loginService: LoginService, private router: Router ) { }

  ngOnInit(): void {

  }


  fazerLogin():void{
    let usuarioLogado = this.loginService.fazerLogin(this.usuario).subscribe((usuarioLogado)=>{
      if(usuarioLogado.isAdmin == true){
          this.loginService.autenticaUsuarioLogado(true, usuarioLogado, usuarioLogado.id)
          this.loginService.showMessage("Logado com Sucesso!")
          this.router.navigate(['/'])
        }else if (usuarioLogado.isAdmin == false){
          this.loginService.showMessage("Logado com Sucesso!")
          this.loginService.autenticaUsuarioLogado(false, usuarioLogado, usuarioLogado.id)
          this.router.navigate(['/'])
        }else {
          this.loginService.showMessage("Usuario Inexistente!")
          this.loginService.autenticaUsuarioLogado(false, usuarioLogado, usuarioLogado.id)
      }

    })

  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}

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
          this.loginService.autenticaUsuarioLogado(true)
          this.loginService.showMessage("Logado com Sucesso!")
          this.router.navigate(['/'])
          console.log(usuarioLogado)
        }else if (usuarioLogado.isAdmin == false){
          this.loginService.showMessage("Logado com Sucesso!")
          this.loginService.autenticaUsuarioLogado(false)
        this.router.navigate(['/'])
          console.log(usuarioLogado)
        }else {
          this.loginService.showMessage("Usuario Inexistente!")
          console.log(usuarioLogado)
      }

    })

  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}

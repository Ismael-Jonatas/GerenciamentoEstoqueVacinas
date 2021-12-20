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

  ngOnInit(): void { }

  fazerLogin(): void {
    this.loginService.fazerLogin(this.usuario).subscribe((usuarioLogado)=>{
      if(Object.values(usuarioLogado).filter(i => i !== null).length > 0) {
        localStorage.setItem("usuarioLogado", JSON.stringify(this.usuario));
        if (usuarioLogado.isAdmin){
          this.loginService.autenticaUsuarioLogado(true, usuarioLogado, usuarioLogado.id)
          this.loginService.showMessage("Logado com Sucesso!")
          this.router.navigate(['/'])
        } else if (!usuarioLogado.isAdmin){
          this.loginService.showMessage("Logado com Sucesso!")
          this.loginService.autenticaUsuarioLogado(false, usuarioLogado, usuarioLogado.id)
          this.router.navigate(['/'])
        }
      } else {
        this.loginService.showMessage("Usuario Inexistente!")
      }
    })

  }

  cancelar():void{
    this.router.navigate(['/'])
  }

}

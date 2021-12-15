import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../model/usuario.model";
import {UsuarioService} from "../../../service/usuario.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: Usuario = {
    nome:'',
    cpf:'',
    matricula:'',
    senha:'',
    isAdmin:false,
  }
  constructor(private usuarioService: UsuarioService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  createUser():void{
    if (this.loginService.getUsuarioLogado() == true){
      this.usuarioService.create(this.usuario).subscribe(()=>{
        this.usuarioService.showMessage("Usuário Cadastrado!")
        this.router.navigate(['/login'])
      })
    }else{
      this.usuarioService.showMessage("Você não Possui Privilégios!")
    }

  }

  cancelCadastro():void{
    this.router.navigate(['/login'])
  }

}

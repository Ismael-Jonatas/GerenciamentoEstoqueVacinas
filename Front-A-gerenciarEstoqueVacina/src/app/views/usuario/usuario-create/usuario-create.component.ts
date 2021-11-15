import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../model/usuario.model";
import {UsuarioService} from "../../../service/usuario.service";
import {Router} from "@angular/router";

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
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser():void{
    this.usuarioService.create(this.usuario).subscribe(()=>{
      this.usuarioService.showMessage("Usuário Cadastrado!")
      this.router.navigate(['/login'])
    })
  }

  cancelCadastro():void{
    this.router.navigate(['/gerenciarusuario'])
  }

}

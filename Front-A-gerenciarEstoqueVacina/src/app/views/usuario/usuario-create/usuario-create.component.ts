import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../../model/usuario.model";
import { Router } from "@angular/router";
import { LoginPublisher } from "../../../service/login-publisher.service";
import { FacadeService } from 'src/app/service/facade.service';

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
  usuarioLogado: Usuario = null;
  loaded: boolean = false;

  constructor(private facadeService: FacadeService, private router: Router, private loginPublisher: LoginPublisher) { }

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
    if(usuarioLogado)
      this.updateLogado();
    else
      this.router.navigate(['login']);
  }

  async updateLogado() {
    this.loaded = true;
  }

  createUser():void{
    if (this.usuarioLogado !== null && this.usuarioLogado.isAdmin){
      this.facadeService.create("usuario",this.usuario).subscribe(()=>{
        this.facadeService.showMessage("usuario","Usuário Cadastrado!");
        window.location.reload();
      })
    } else
      this.facadeService.showMessage("usuario","Você não Possui Privilégios!")
  }

  cancelCadastro():void{
    this.router.navigate(['login'])
  }

}

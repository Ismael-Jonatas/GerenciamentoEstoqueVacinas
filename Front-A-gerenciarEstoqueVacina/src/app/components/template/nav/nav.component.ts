import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  usuarioLogado: Usuario = this.loginService.getUsuarioLogado();
  usuarioLogadoStatus: boolean = this.loginService.getStatus();

  ngOnInit(): void {
    setInterval(() => {
      this.setUsuarioLogado();
      this.setUsuarioLogadoStatus();
    }, 500)
  }

  setUsuarioLogado() {
    this.usuarioLogado = this.loginService.getUsuarioLogado();
  }

  setUsuarioLogadoStatus() {
    this.usuarioLogadoStatus = this.loginService.getStatus();
  }
}

import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario.model';
import { LoginPublisher } from 'src/app/service/login-publisher.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private loginPublisher: LoginPublisher, private router: Router) { }

  usuarioLogado: Usuario = null;

  ngOnInit(): void {
    this.loginPublisher.addSubscriber(this);
    this.loginPublisher.verificaLogin(this);
  }

  updateSubscriber(usuarioLogado: Usuario) {
    this.usuarioLogado = usuarioLogado;
    if(!usuarioLogado)
      this.router.navigate(['login']);
  }

}

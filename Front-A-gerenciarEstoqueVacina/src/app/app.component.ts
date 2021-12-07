import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Front-A-gerenciarEstoqueVacina';
  mostrarMenu: boolean = false;

  constructor(private loginService : LoginService) {
  }

  ngOnInit(){
    this.loginService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }
}

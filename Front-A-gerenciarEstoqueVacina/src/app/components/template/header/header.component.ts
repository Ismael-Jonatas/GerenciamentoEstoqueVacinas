import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logout():void{
    if (this.loginService.getUsuarioLogado().id != 0){
      this.showMessage("Sessão Encerrada!")
      setTimeout(function() {
        window.location.reload();
      }, 1500);
    }else{
      this.showMessage("Não ha usuário logado!")
    }


  }

  showMessage(msg: string):void{
    this.snackBar.open(msg,'X', {duration:1500,
      horizontalPosition:"center",
      verticalPosition:"top"})
  }

}

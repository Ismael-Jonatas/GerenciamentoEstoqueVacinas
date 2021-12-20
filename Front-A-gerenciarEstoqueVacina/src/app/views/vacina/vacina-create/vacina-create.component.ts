import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TipoVacina } from "../../../model/tipoVacina.model";
import { TipoVacinaService } from "../../../service/tipoVacina.service";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-vacina-create',
  templateUrl: './vacina-create.component.html',
  styleUrls: ['./vacina-create.component.scss']
})
export class TipoVacinaCreateComponent implements OnInit {

  filterFields: string[] = ['Id','Nome','Descrição'];
  filterField: string = '';
  filterTiposVacinas: TipoVacina[] = [];
  tipoVacinas: TipoVacina[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];
  tipoVacina: TipoVacina = {
    nome:'',
    descricao:'',
    loteVacina: []
  }
  loaded: boolean = false;

  constructor(private tipoVacinaService: TipoVacinaService , private router: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginService.verificaLogin().then(async isLogado => {
      if(isLogado) {
        await this.getTiposVacina();
      }
      this.loaded = true;
    });
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getTiposVacina() {

    this.tipoVacinaService.read().subscribe((tiposVacina: TipoVacina[]) => {
      this.tipoVacinas = tiposVacina;
      this.filterTiposVacinas = tiposVacina;
    });

  }

  createTipoVacina(buttonSalvar: MatButton, buttonCancelar: MatButton):void{
    if(this.loginService.getStatus() == true){
      if(this.tipoVacina.nome !== '' && this.tipoVacina.descricao !== '') {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.tipoVacinaService.create(this.tipoVacina).subscribe(()=>{
          this.tipoVacinaService.showMessage("Tipo de Vacina Cadastrado!")
          this.getTiposVacina();
          this.showPopUp();
        })
      } else {
        this.tipoVacinaService.showMessage("Preencha todos os campos!")
      }
    }else{
      this.tipoVacinaService.showMessage("Você não Possui Privilégios!")
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterTiposVacinas = this.tipoVacinas.filter(tipoVacina => {

      let validId = false;
      if(tipoVacina.id !== undefined) {
        const validText = tipoVacina.id.toString().includes(searchText.toLowerCase());
        validId = validText && this.filterField === "id" || validText && this.filterField === "";
      }

      let validName = false;
      if(tipoVacina.nome !== undefined) {
        const validText = tipoVacina.nome.toLowerCase().includes(searchText.toLowerCase());
        validName = validText && this.filterField === "nome" || validText && this.filterField === "";
      }

      let validDescription = false;
      if(tipoVacina.descricao !== undefined) {
        const validText = tipoVacina.descricao.toLowerCase().includes(searchText.toLowerCase());
        validDescription = validText && this.filterField === "descricao" || validText && this.filterField === "";
      }

      return validId || validName || validDescription;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

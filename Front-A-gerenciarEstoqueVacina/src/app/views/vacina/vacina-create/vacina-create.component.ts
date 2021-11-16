import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TipoVacina } from "../../../model/tipoVacina.model";
import { TipoVacinaService } from "../../../service/tipoVacina.service";

@Component({
  selector: 'app-vacina-create',
  templateUrl: './vacina-create.component.html',
  styleUrls: ['./vacina-create.component.scss']
})
export class TipoVacinaCreateComponent implements OnInit {

  filterTiposVacinas: TipoVacina[] = [];
  tipoVacinas: TipoVacina[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'nome', 'descricao'];
  tipoVacina: TipoVacina = {
    nome:'',
    descricao:'',
    loteVacina: []
  }

  constructor(private tipoVacinaService: TipoVacinaService , private router: Router) { }

  ngOnInit(): void {
    this.getTiposVacina();
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
    if(this.tipoVacina.nome !== '' && this.tipoVacina.descricao !== '') {
      buttonSalvar.disabled = true;
      buttonCancelar.disabled = true;

      this.tipoVacinaService.create(this.tipoVacina).subscribe(()=>{
        this.tipoVacinaService.showMessage("Tipo de Vacina Cadastrado!")
        location.reload();
      })
    } else {
      this.tipoVacinaService.showMessage("Preencha todos os campos!")
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterTiposVacinas = this.tipoVacinas.filter(tipoVacina => {

      let validId = false;
      if(tipoVacina.id !== undefined) {
        validId = tipoVacina.id.toString().includes(searchText.toLowerCase());
      }
      const validName = tipoVacina.nome.toLowerCase().includes(searchText.toLowerCase());
      const validDescription = tipoVacina.descricao.toLowerCase().includes(searchText.toLowerCase());

      return validId || validName || validDescription;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

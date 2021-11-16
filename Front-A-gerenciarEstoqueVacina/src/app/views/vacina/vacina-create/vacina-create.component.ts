import { Component, OnInit } from '@angular/core';
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
  vacina: TipoVacina = {
    nome:'',
    descricao:''
  }

  constructor(private tipoVacinaService: TipoVacinaService , private router: Router) { }

  ngOnInit(): void {
    this.getTiposVacina();
  }

  showPopUp(): void {
    this.flagShowPopup = true;
  }

  async getTiposVacina() {

    this.tipoVacinaService.getAll().subscribe((tiposVacina: TipoVacina[]) => {
      this.tipoVacinas = tiposVacina;
      this.filterTiposVacinas = tiposVacina;
    });
    // const vacina: Vacina = {
      // id: 1,
      // nome: "Teste",
      // descricao: "Descrição foda"
    // }

    // this.vacinas.push(vacina);
    // this.filterVacinas = this.vacinas;

  }

  createTipoVacina():void{
    this.tipoVacinaService.create(this.vacina).subscribe(()=>{
      this.tipoVacinaService.showMessage("Tipo de Vacina Cadastrado!")
      this.router.navigate(['/login'])
    })
  }

  cancelCadastro():void{
    this.router.navigate(['/login'])
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


}

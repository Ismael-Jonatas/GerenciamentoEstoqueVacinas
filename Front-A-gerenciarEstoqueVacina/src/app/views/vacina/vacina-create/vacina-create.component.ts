import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TipoVacina } from "../../../model/tipoVacina.model";
import { LoginPublisher } from "../../../service/login-publisher.service";
import { Usuario } from 'src/app/model/usuario.model';
import { FacadeService } from 'src/app/service/facade.service';

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
    await this.getTiposVacina();
    this.loaded = true;
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getTiposVacina() {

    this.facadeService.read("tipoVacina").subscribe((tiposVacina: TipoVacina[]) => {
      this.tipoVacinas = tiposVacina;
      this.filterTiposVacinas = tiposVacina;
    });

  }

  createTipoVacina(buttonSalvar: MatButton, buttonCancelar: MatButton):void{
    if(this.usuarioLogado != null && this.usuarioLogado.isAdmin){
      if(this.tipoVacina.nome !== '' && this.tipoVacina.descricao !== '') {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.facadeService.create("tipoVacina",this.tipoVacina).subscribe(()=>{
          this.facadeService.showMessage("tipoVacina","Tipo de Vacina Cadastrado!")
          this.getTiposVacina();
          this.showPopUp();
        })
      } else {
        this.facadeService.showMessage("tipoVacina","Preencha todos os campos!")
      }
    } else
      this.facadeService.showMessage("tipoVacina","Você não Possui Privilégios!");
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

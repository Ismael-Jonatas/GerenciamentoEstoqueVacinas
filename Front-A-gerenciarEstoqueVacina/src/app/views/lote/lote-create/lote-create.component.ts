import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {LoteService} from "../../../service/lote.service";
import {TipoVacinaService} from "../../../service/tipoVacina.service";
import {FornecedorService} from "../../../service/fornecedor.service";
import {Router} from "@angular/router";
import {Fornecedor} from "../../../model/fornecedor.model";
import {TipoVacina} from "../../../model/tipoVacina.model";
import {Lote} from "../../../model/lote.model";

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.scss']
})
export class LoteCreateComponent implements OnInit {

  filterLotes: Lote[] = [];
  lotes: Lote[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'dataVencimento', 'descricao','quantidade','idFornecedor','idTipo'];
  lote: Lote = {
    dataVencimento: new Date(),
    descricao: '',
    quantidade: 0,
    idFornecedor: 0,
    idTipoVacina: 0
  }
  fornecedores: Fornecedor[] = [];
  tiposVacina: TipoVacina[] = [];

  constructor(private loteService: LoteService, private tipoVacinaService: TipoVacinaService, private fornecedorService: FornecedorService, private router: Router) { }

  ngOnInit(): void {
    this.getLotes();
    this.getTiposVacina();
    this.getFornecedores();
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getLotes() {

    this.loteService.read().subscribe((lotes: Lote[]) => {
      this.lotes = lotes;
      this.filterLotes = lotes;
    });

  }

  async getTiposVacina() {
    this.tipoVacinaService.read().subscribe((tiposVacina: TipoVacina[]) => {
      this.tiposVacina = tiposVacina;
    });
  }

  async getFornecedores() {
    this.fornecedorService.read().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

  createLote(buttonSalvar: MatButton, buttonCancelar: MatButton):void{
    if(this.lote.descricao!= '' && this.lote.quantidade!= 0 && this.lote.idFornecedor!= 0 && this.lote.idTipoVacina!= 0) {
      buttonSalvar.disabled = true;
      buttonCancelar.disabled = true;

      this.loteService.create(this.lote).subscribe(()=>{
        this.loteService.showMessage("Lote Cadastrado!")
        location.reload();
      })
    } else {
      this.loteService.showMessage("Preencha todos os campos!")
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterLotes = this.lotes.filter(lote => {

      let validId = false;
      if(lote.id !== undefined) {
        validId = lote.id.toString().includes(searchText.toLowerCase());
      }

      let validDate = false;
      if(lote.dataVencimento !== undefined) {
        const date = lote.dataVencimento.toString().split("T")[0].split("-").reverse().join("/");
        const hour = lote.dataVencimento.toString().split("T")[1].split(".")[0];
        validDate = `${date} ${hour}`.includes(searchText.toLowerCase());
      }

      let validDescription = false;
      if(lote.descricao !== undefined) {
        validDescription = lote.descricao.toLowerCase().includes(searchText.toLowerCase());
      }

      let validCount = false;
      if(lote.quantidade !== undefined) {
        validCount = lote.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
      }

      return validId || validDate || validDescription || validCount;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

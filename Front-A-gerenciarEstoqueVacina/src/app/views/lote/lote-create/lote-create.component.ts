import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {LoteService} from "../../../service/lote.service";
import {TipoVacinaService} from "../../../service/tipoVacina.service";
import {FornecedorService} from "../../../service/fornecedor.service";
import {Router} from "@angular/router";
import {Fornecedor} from "../../../model/fornecedor.model";
import {TipoVacina} from "../../../model/tipoVacina.model";
import {Lote} from "../../../model/lote.model";
import {LoteCreate} from "../../../model/loteCreate.model";

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.scss']
})
export class LoteCreateComponent implements OnInit {

  filterLotes: Lote[] = [];
  lotes: Lote[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'dataVencimento', 'descricao','quantidade','fornecedor','tipo'];
  filterDisplayedColumns: string[] = ['id', 'dataVencimento', 'descricao','quantidade','fornecedor','tipo'];
  lote: LoteCreate = {
    dataVencimento: new Date(),
    descricao: '',
    quantidade: 0,
    idFornecedor: 0,
    idTipo: 0
  }
  fornecedores: Fornecedor[] = [];
  tiposVacina: TipoVacina[] = [];
  lotesEmEstoque: boolean = false;
  quantidadeVacinasFornecedor: boolean = false;

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
    if(this.lote.descricao!= '' && this.lote.quantidade!= 0 && this.lote.idFornecedor!= 0 && this.lote.idTipo!= 0) {
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

    if(this.quantidadeVacinasFornecedor) {
      this.filterDisplayedColumns = this.displayedColumns.filter(item => !["id","dataVencimento","descricao"].includes(item));
    } else {
      this.filterDisplayedColumns = this.displayedColumns;
    }

    let fornecedorTipoVacina: Lote[] = [];
    let lotesCopy: Lote[] = JSON.parse(JSON.stringify(this.lotes));

    this.filterLotes = lotesCopy.filter(lote => {

      if(this.quantidadeVacinasFornecedor) {
        const checkIndex: any = fornecedorTipoVacina.map((item,i) =>
          item.idFornecedor.id === lote.idFornecedor.id && item.idTipo.id === lote.idTipo.id ? i : false
        ).filter(i => i !== false);
        if(checkIndex.length > 0) {
          const index = checkIndex[0];
          lotesCopy[index].quantidade += lote.quantidade;
          return false;
        } else {
          fornecedorTipoVacina.push(lote);
        }
      }

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

      let validFornecedor = false;
      if(lote.idFornecedor !== undefined) {
        validFornecedor = `${lote.idFornecedor.id} - ${lote.idFornecedor.nome}`.toLowerCase().includes(searchText.toLowerCase());
      }

      let validTipoVacina = false;
      if(lote.idTipo !== undefined) {
        validTipoVacina = `${lote.idTipo.id} - ${lote.idTipo.nome}`.toLowerCase().includes(searchText.toLowerCase());
      }

      return validId || validDate || validDescription || validCount || validFornecedor || validTipoVacina;
    });

    this.filterLotes = this.filterLotes.filter(lote => !(this.lotesEmEstoque && lote.quantidade < 1));
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

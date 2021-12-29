import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from "@angular/router";
import { Fornecedor } from "../../../model/fornecedor.model";
import { TipoVacina } from "../../../model/tipoVacina.model";
import { Lote } from "../../../model/lote.model";
import { LoteCreate } from "../../../model/loteCreate.model";
import { LoginPublisher } from "../../../service/login-publisher.service";
import { ToListagemDeRegistroEntrada } from "../../../model/ToListagemDeRegistroEntrada";
import { Usuario } from 'src/app/model/usuario.model';
import { FacadeService } from 'src/app/service/facade.service';

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.scss']
})
export class LoteCreateComponent implements OnInit {

  filterLotes: Lote[] = [];
  filterFields: string[] = ['Id','Data Vencimento','Descrição','Quantidade','Fornecedor','Tipo Vacina'];
  filterField: string = '';
  lotes: Lote[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'dataVencimento', 'descricao','quantidade','fornecedor','tipo'];
  filterDisplayedColumns: string[] = ['id', 'dataVencimento', 'descricao','quantidade','fornecedor','tipo'];
  lote: LoteCreate = {
    dataVencimento: new Date(),
    descricao: '',
    quantidade: 0,
    idFornecedor: 0,
    idTipoVacina: 0
  }
  fornecedores: Fornecedor[] = [];
  tiposVacina: TipoVacina[] = [];
  lotesEmEstoque: boolean = false;
  quantidadeVacinasFornecedor: boolean = false;
  usuarioLogado: Usuario = null;
  loaded: boolean = false;

  constructor(private loginPublisher: LoginPublisher, private facadeService: FacadeService, private router: Router) { }

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
    await this.getLotes();
    await this.getTiposVacina();
    await this.getFornecedores();
    this.loaded = true;
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getLotes() {
    this.facadeService.read("lote").subscribe((lotes: Lote[]) => {
      this.lotes = lotes;
      this.filterLotes = lotes;
    });
  }

  async getTiposVacina() {
    this.facadeService.read("tipoVacina").subscribe((tiposVacina: TipoVacina[]) => {
      this.tiposVacina = tiposVacina;
    });
  }

  async getFornecedores() {
    this.facadeService.read("fornecedor").subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    });
  }

  createLote(buttonSalvar: MatButton, buttonCancelar: MatButton):void{
    if (this.usuarioLogado !== null && this.usuarioLogado.isAdmin){
      if(this.lote.descricao!= '' && this.lote.quantidade!= 0 && this.lote.idFornecedor!= 0 && this.lote.idTipoVacina!= 0) {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.facadeService.create("lote",this.lote).subscribe((loteSalvo)=>{
          this.createRegistroEntrada(loteSalvo.id ,loteSalvo.quantidade, loteSalvo.descricao)
        })

      } else {
        this.facadeService.showMessage("lote","Preencha todos os campos!")
      }
    }else{
      this.facadeService.showMessage("lote","Você não Possui Privilégios!")
    }
  }

  createRegistroEntrada(idLote: number | undefined, quantidade: number, descricao: string ):void{
    let resgatarIdUsuarioLogado = this.usuarioLogado !== null ? this.usuarioLogado.id : null;

    if (idLote != undefined && resgatarIdUsuarioLogado  !== null) {

      let registroEntrada:  ToListagemDeRegistroEntrada = {
        idUsuario: resgatarIdUsuarioLogado,
        data: new Date(),
        idLote: idLote,
        quantidade: quantidade,
        descricao: descricao
      }
      this.facadeService.create("registroEntrada",registroEntrada).subscribe((salvando)=>{
        this.facadeService.showMessage("lote","Lote Cadastrado!");
        this.showPopUp();
        this.getLotes();
      })
    } else {
      this.facadeService.showMessage("registroEntrada","Lote ou Usuário inexistente")
    }

  }

  search(input: HTMLInputElement) {
    const searchText = input.value.trim();

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
        const validText = lote.id.toString().includes(searchText.toLowerCase());
        validId = validText && this.filterField === "id" || validText && this.filterField === "";
      }

      let validDate = false;
      if(lote.dataVencimento !== undefined) {
        const date = lote.dataVencimento.toString().split("T")[0].split("-").reverse().join("/");
        const hour = lote.dataVencimento.toString().split("T")[1].split(".")[0];
        const validText = `${date} ${hour}`.includes(searchText.toLowerCase());
        validDate = validText && this.filterField === "dataVencimento" || validText && this.filterField === "";
      }

      let validDescription = false;
      if(lote.descricao !== undefined) {
        const validText = lote.descricao.toLowerCase().includes(searchText.toLowerCase());
        validDescription = validText && this.filterField === "descricao" || validText && this.filterField === "";
      }

      let validCount = false;
      if(lote.quantidade !== undefined) {
        const validText = lote.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
        validCount = validText && this.filterField === "quantidade" || validText && this.filterField === "";
      }

      let validFornecedor = false;
      if(lote.idFornecedor !== undefined) {
        const validText = `${lote.idFornecedor.id} - ${lote.idFornecedor.nome}`.toLowerCase().includes(searchText.toLowerCase());
        validFornecedor = validText && this.filterField === "fornecedor" || validText && this.filterField === "";
      }

      let validTipoVacina = false;
      if(lote.idTipo !== undefined) {
        const validText = `${lote.idTipo.id} - ${lote.idTipo.nome}`.toLowerCase().includes(searchText.toLowerCase());
        validTipoVacina = validText && this.filterField === "tipo" || validText && this.filterField === "";
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

import { Component, OnInit } from '@angular/core';
import { RegistroSaida } from "../../../model/registroSaida";
import { Lote } from "../../../model/lote.model";
import { LoteService } from "../../../service/lote.service";
import { Router } from "@angular/router";
import { Usuario } from "../../../model/usuario.model";
import { UsuarioService } from "../../../service/usuario.service";
import { RegistroDeSaidaService } from "../../../service/registro-de-saida.service";
import { MatButton } from "@angular/material/button";
import { LoginPublisher } from "../../../service/login-publisher.service";

@Component({
  selector: 'app-registro-saida',
  templateUrl: './registro-saida.component.html',
  styleUrls: ['./registro-saida.component.scss']
})
export class RegistroSaidaComponent implements OnInit {

  filterFields: string[] = ['Id','Data de Saida','Descrição','Quantidade','Lote','Usuário'];
  filterField: string = '';
  filterRegistroSaida: RegistroSaida[] = [];
  registroSaidas: RegistroSaida[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'idUsuario', 'data','idLote','quantidade','descricao'];
  registroSaida: RegistroSaida = {
    idUsuario: 0,
    data: new Date(),
    idLote: 0,
    quantidade: 0,
    descricao: '',
  }
  lotes: Lote[] = [];
  usuarios: Usuario[] = [];
  usuarioLogado: Usuario = null;
  loaded: boolean = false;

  constructor(private loginPublisher: LoginPublisher, private loteService: LoteService, private usuarioService: UsuarioService, private registroSaidaService: RegistroDeSaidaService, private router: Router) { }

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
    await this.getUsuarios();
    await this.getRegistrosSaidas();
    this.loaded = true;
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getLotes() {

    this.loteService.read().subscribe((lotes: Lote[]) => {
      this.lotes = lotes;
    });

  }

  async getUsuarios() {

    this.usuarioService.read().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });

  }

  async getRegistrosSaidas() {

    this.registroSaidaService.read().subscribe((registroSaidas: RegistroSaida[]) => {
      this.registroSaidas = registroSaidas;
      this.filterRegistroSaida = registroSaidas;
    });

  }


  createLote(buttonSalvar: MatButton, buttonCancelar: MatButton):void{
    if(this.usuarioLogado !== null && this.usuarioLogado.isAdmin){
      if(this.registroSaida.descricao!= '' && this.registroSaida.quantidade!= 0 && this.registroSaida.data!= null && this.registroSaida.idLote!= 0 && this.registroSaida.idUsuario!= 0 ) {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.registroSaidaService.create(this.registroSaida).subscribe(()=>{
          this.registroSaidaService.showMessage("Registro Cadastrado!");
          this.showPopUp();
          this.getRegistrosSaidas();
        })
      } else {
        this.registroSaidaService.showMessage("Preencha todos os campos!")
      }
    } else {
      this.registroSaidaService.showMessage("Você não Possui Privilégios!")
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterRegistroSaida = this.registroSaidas.filter(registro => {

      let validId = false;
      if(registro.id !== undefined) {
        const validText = registro.id.toString().includes(searchText.toLowerCase());
        validId = validText && this.filterField === "id" || validText && this.filterField === "";
      }

      let validDate = false;
      if(registro.data !== undefined) {
        const date = registro.data.toString().split("T")[0].split("-").reverse().join("/");
        const hour = registro.data.toString().split("T")[1].split(".")[0];
        const validText = `${date} ${hour}`.includes(searchText.toLowerCase());
        validDate = validText && this.filterField === "data" || validText && this.filterField === "";
      }

      let validDescription = false;
      if(registro.descricao !== undefined) {
        const validText = registro.descricao.toLowerCase().includes(searchText.toLowerCase());
        validDescription = validText && this.filterField === "descricao" || validText && this.filterField === "";
      }

      let validCount = false;
      if(registro.quantidade !== undefined) {
        const validText = registro.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
        validCount = validText && this.filterField === "quantidade" || validText && this.filterField === "";
      }

      let validLote = false;
      if(registro.idLote !== undefined) {
        const validText = registro.idLote.toString().toLowerCase().includes(searchText.toLowerCase());
        validLote = validText && this.filterField === "idLote" || validText && this.filterField === "";
      }

      let validUsuario = false;
      if(registro.idUsuario !== undefined) {
        const validText = registro.idUsuario.toString().toLowerCase().includes(searchText.toLowerCase());
        validUsuario = validText && this.filterField === "idUsuario" || validText && this.filterField === "";
      }


      return validId || validDate || validDescription || validCount || validLote || validUsuario;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}

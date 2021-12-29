import { Component, OnInit } from '@angular/core';
import { RegistroEntrada } from "../../../model/registroEntrada";
import { Lote } from "../../../model/lote.model";
import { Usuario } from "../../../model/usuario.model";
import { LoginPublisher } from "../../../service/login-publisher.service";
import { Router } from "@angular/router";
import { FacadeService } from 'src/app/service/facade.service';

@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styleUrls: ['./registro-entrada.component.scss']
})
export class RegistroEntradaComponent implements OnInit {

  filterFields: string[] = ['Id','Data de Entrada','Descrição','Quantidade','Lote','Usuário'];
  filterField: string = '';
  filterRegistroEntrada: RegistroEntrada[] = [];
  registroEntradas: RegistroEntrada[] = [];
  displayedColumns: string[] = ['id', 'idUsuario', 'data','idLote','quantidade','descricao'];
  lotes: Lote[] = [];
  usuarios: Usuario[] = [];
  loaded: boolean = false;
  usuarioLogado: Usuario = null;

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
    await this.getUsuarios();
    await this.getRegistrosSaidas();
    this.loaded = true;
  }

  async getLotes() {
    this.facadeService.read("lote").subscribe((lotes: Lote[]) => {
      this.lotes = lotes;
    });
  }

  async getUsuarios() {

    this.facadeService.read("usuario").subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });

  }

  async getRegistrosSaidas() {

    this.facadeService.read("registroEntrada").subscribe((registroEntradas: RegistroEntrada[]) => {
      this.registroEntradas = registroEntradas;
      this.filterRegistroEntrada = registroEntradas;
    });

  }

  search(input: HTMLInputElement) {
    const searchText = input.value.trim();
    this.filterRegistroEntrada = this.registroEntradas.filter(registro => {

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



}

import { Component, OnInit } from '@angular/core';
import {RegistroSaida} from "../../../model/registroSaida";
import {Lote} from "../../../model/lote.model";
import {LoteService} from "../../../service/lote.service";
import {Router} from "@angular/router";
import {Usuario} from "../../../model/usuario.model";
import {UsuarioService} from "../../../service/usuario.service";
import {RegistroDeSaidaService} from "../../../service/registro-de-saida.service";
import {MatButton} from "@angular/material/button";
import {LoginService} from "../../../service/login.service";

@Component({
  selector: 'app-registro-saida',
  templateUrl: './registro-saida.component.html',
  styleUrls: ['./registro-saida.component.scss']
})
export class RegistroSaidaComponent implements OnInit {

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

  constructor(private loginService:LoginService, private loteService: LoteService, private usuarioService: UsuarioService, private registroSaidaService: RegistroDeSaidaService, private router: Router) { }

  ngOnInit(): void {
    this.getLotes();
    this.getUsuarios();
    this.getRegistrosSaidas();
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
    if(this.loginService.getUsuarioLogado() == true){
      if(this.registroSaida.descricao!= '' && this.registroSaida.quantidade!= 0 && this.registroSaida.data!= null && this.registroSaida.idLote!= 0 && this.registroSaida.idUsuario!= 0 ) {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.registroSaidaService.create(this.registroSaida).subscribe(()=>{
          this.registroSaidaService.showMessage("Registro Cadastrado!")
          this.router.navigate(['/registrodesaida'])
        })
      } else {
        this.registroSaidaService.showMessage("Preencha todos os campos!")
      }
    }else{
      this.registroSaidaService.showMessage("Você não Possui Privilégios!")
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value;
    this.filterRegistroSaida = this.registroSaidas.filter(registro => {

      let validId = false;
      if(registro.id !== undefined) {
        validId = registro.id.toString().includes(searchText.toLowerCase());
      }

      let validDate = false;
      if(registro.data !== undefined) {
        const date = registro.data.toString().split("T")[0].split("-").reverse().join("/");
        const hour = registro.data.toString().split("T")[1].split(".")[0];
        validDate = `${date} ${hour}`.includes(searchText.toLowerCase());
      }

      let validDescription = false;
      if(registro.descricao !== undefined) {
        validDescription = registro.descricao.toLowerCase().includes(searchText.toLowerCase());
      }

      let validCount = false;
      if(registro.quantidade !== undefined) {
        validCount = registro.quantidade.toString().toLowerCase().includes(searchText.toLowerCase());
      }

      let validLote = false;
      if(registro.idLote !== undefined) {
        validLote = registro.idLote.toString().toLowerCase().includes(searchText.toLowerCase());
      }

      let validUsuario = false;
      if(registro.idUsuario !== undefined) {
        validUsuario = registro.idUsuario.toString().toLowerCase().includes(searchText.toLowerCase());
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

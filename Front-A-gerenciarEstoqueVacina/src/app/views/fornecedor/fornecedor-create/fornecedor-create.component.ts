import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/model/fornecedor.model';
import { Usuario } from 'src/app/model/usuario.model';
import { FacadeService } from 'src/app/service/facade.service';
import { LoginPublisher } from "../../../service/login-publisher.service";

@Component({
  selector: 'app-fornecedor-create',
  templateUrl: './fornecedor-create.component.html',
  styleUrls: ['./fornecedor-create.component.scss']
})
export class FornecedorCreateComponent implements OnInit {

  filterFields: string[] = ['Id','Nome','CNPJ'];
  filterField: string = '';
  filterFornecedores: Fornecedor[] = [];
  fornecedores: Fornecedor[] = [];
  flagShowPopup = false;
  displayedColumns: string[] = ['id', 'nome', 'cnpj'];
  fornecedor: Fornecedor = {
    nome: '',
    cnpj: ''
  }
  loaded: boolean = false;
  usuarioLogado: Usuario = null;

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
    await this.getFornecedores();
    this.loaded = true;
  }

  showPopUp(): void {
    this.flagShowPopup = !this.flagShowPopup;
  }

  async getFornecedores() {

    this.facadeService.read("fornecedor").subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
      this.filterFornecedores = fornecedores;
    });

  }

  createFornecedor(buttonSalvar: MatButton, buttonCancelar: MatButton):void {
    if (this.usuarioLogado !== null && this.usuarioLogado.isAdmin){
      if(this.fornecedor.nome !== '' && this.fornecedor.cnpj !== '') {
        buttonSalvar.disabled = true;
        buttonCancelar.disabled = true;

        this.facadeService.create("fornecedor",this.fornecedor).subscribe(()=>{
          this.facadeService.showMessage("fornecedor","Fornecedor Cadastrado!");
          this.showPopUp();
          this.getFornecedores();
        })
      } else {
        this.facadeService.showMessage("fornecedor","Preencha todos os campos!");
      }
    }else{
      this.facadeService.showMessage("fornecedor","Voc?? n??o Possui Privil??gios!");
    }
  }

  search(input: HTMLInputElement) {
    const searchText = input.value.trim();
    this.filterFornecedores = this.fornecedores.filter(fornecedor => {

      let validId = false;
      if(fornecedor.id !== undefined) {
        const validText = fornecedor.id.toString().includes(searchText.toLowerCase());
        validId = validText && this.filterField === "id" || validText && this.filterField === "";
      }

      let validNome = false;
      if(fornecedor.nome !== undefined) {
        const validText = fornecedor.nome.toLowerCase().includes(searchText.toLowerCase());
        validNome = validText && this.filterField === "nome" || validText && this.filterField === "";
      }

      let validCNPJ = false;
      if(fornecedor.cnpj !== undefined) {
        const validText = fornecedor.cnpj.toLowerCase().includes(searchText.toLowerCase());
        validCNPJ = validText && this.filterField === "cnpj" || validText && this.filterField === "";
      }

      return validId || validNome || validCNPJ;
    });
  }

  clickPoUp(event: Event, popUp: HTMLDivElement) {
    if(event.target === popUp) {
      this.showPopUp();
    }
  }
}


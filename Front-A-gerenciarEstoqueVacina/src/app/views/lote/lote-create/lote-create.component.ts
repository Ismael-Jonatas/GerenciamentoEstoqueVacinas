import { Component, OnInit } from '@angular/core';
import {LoteService} from "../../../service/lote.service";
import {Router} from "@angular/router";
import {Lote} from "../../../model/lote.model";

@Component({
  selector: 'app-lote-create',
  templateUrl: './lote-create.component.html',
  styleUrls: ['./lote-create.component.scss']
})
export class LoteCreateComponent implements OnInit {

  lotevacina: Lote = {
    dataVencimento: new Date(),
    descricao: '',
    quantidade: 0,
    idFornecedor: 0,
    idTipoVacina: 0,
  }
  constructor(private loteservice:LoteService, private router:Router ) { }

  ngOnInit(): void {
  }

  createLoteVacina():void{
    this.loteservice.create(this.lotevacina).subscribe(()=>{
      this.loteservice.showMessage("Lote Cadastrado!")
      this.router.navigate(['/lotevacina'])
    })
  }

  cancelCadastro():void{
    this.router.navigate(['/lotevacina'])
  }

}

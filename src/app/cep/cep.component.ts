import { Component } from '@angular/core';
import { CepService } from '../services/cep.service';
import { Cep } from '../models/cep';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent {
  ceps: Cep[] = [];
  cep: string = '';
  showModal: boolean = false;

  constructor(private cepService: CepService) { }

  onShowModal() {
    this.showModal = true;

    setTimeout(() => {
      this.showModal = false;
    }, 3500);
  }

  async onSubmit() {
    const cepsLength = this.cep.split(';').length;
    const foundLength = this.cep.match(/\b[0-9]{8}\b/g)?.length;

    if (cepsLength !== foundLength) {
      this.onShowModal();
      return;
    }

    const ceps = await this.cepService.getCep(this.cep);

    ceps.forEach(cep => {
      if ('erro' in cep) {
        this.onShowModal();
      }
    })

    this.ceps = ceps;
  }
}

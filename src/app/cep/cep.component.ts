import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CepService } from '../services/cep.service';
import { Cep } from '../models/cep';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css']
})
export class CepComponent {
  ceps: Cep[] = [];

  constructor(private cepService: CepService) { }

  async onSubmit(cepForm: NgForm) {
    this.ceps = await this.cepService.getCep(cepForm.value.cep)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cep } from '../models/cep';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private httpClient: HttpClient) { }

  async getCep(cep: string): Promise<Cep[]> {
    const ceps = cep.split(';');

    const cepsMapped = await Promise.all(ceps.map(async (cep) => {
      const response = await firstValueFrom(this.httpClient.get<Cep>(`https://viacep.com.br/ws/${cep.trim()}/json`));
      return response;
    }))

    return cepsMapped;
  }
}

import { InventoryMovimentationModel } from './../models/InventoryMovimentationModel';
import { HttpClient } from '@angular/common/http';
import { ApiResultModel } from '../models/ApiResultModel';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })

export class InventoryMovimentationService {
  constructor(private http: HttpClient) {}

  insert(movimentation: InventoryMovimentationModel) {
    return this.http.post<ApiResultModel<number>>(
      `${environment.apiUrl}/inventory/movimentation/`,
      movimentation
    );
  }
}

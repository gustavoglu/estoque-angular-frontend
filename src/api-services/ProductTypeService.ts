import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { type ProductTypeModel } from '../models/ProductTypeModel';
import { type ApiResultModel } from '../models/ApiResultModel';
import { type PaginationDataModel } from '../models/PaginationDataModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService {
  constructor(private http: HttpClient) {}

  getAllPaginated(page: number, limit: number) {
    return this.http.get<ApiResultModel<PaginationDataModel<ProductTypeModel>>>(
      `${environment.apiUrl}/product-type?page=${page}&limit=${limit}`
    );
  }

  getAll() {
    return this.http.get<ApiResultModel<ProductTypeModel[]>>(
      `${environment.apiUrl}/product-type`
    );
  }

  getById(id: number) {
    return this.http.get<ApiResultModel<ProductTypeModel>>(
      `${environment.apiUrl}/product-type/${id}`
    );
  }

  insert(entity: ProductTypeModel) {
    return this.http.post<ApiResultModel<any>>(
      `${environment.apiUrl}/product-type`,
      entity
    );
  }

  update(id: number, entity: ProductTypeModel) {
    return this.http.put<ApiResultModel<any>>(
      `${environment.apiUrl}/product-type/${id}`,
      entity
    );
  }

  delete(id: number) {
    return this.http.delete<ApiResultModel<any>>(
      `${environment.apiUrl}/product-type/${id}`
    );
  }
}

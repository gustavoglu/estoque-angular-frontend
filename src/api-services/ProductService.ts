import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { type ProductModel } from '../models/ProductModel';
import { type ApiResultModel } from '../models/ApiResultModel';
import { type PaginationDataModel } from '../models/PaginationDataModel';
import { InsertProductModel } from '../models/InsertProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll(page: number, limit: number) {
    return this.http.get<ApiResultModel<PaginationDataModel<ProductModel>>>(
      `${environment.apiUrl}/product?page=${page}&limit=${limit}`
    );
  }

  getById(id: number) {
    return this.http.get<ApiResultModel<ProductModel>>(
      `${environment.apiUrl}/product/${id}`
    );
  }

  insert(entity: InsertProductModel) {
    return this.http.post<ApiResultModel<any>>(
      `${environment.apiUrl}/product`,
      entity
    );
  }

  update(id: number, entity: ProductModel) {
    return this.http.put<ApiResultModel<any>>(
      `${environment.apiUrl}/product/${id}`,
      entity
    );
  }

  delete(id: number) {
    return this.http.delete<ApiResultModel<any>>(
      `${environment.apiUrl}/product/${id}`
    );
  }

  getTotalMovimentation(id: number) {
    return this.http.get<ApiResultModel<number>>(
      `${environment.apiUrl}/product/${id}/movimentation`
    );
  }
}

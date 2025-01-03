import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../api-services/ProductService';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApiResultModel } from '../../models/ApiResultModel';
import { Toast } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ProductModel } from '../../models/ProductModel';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-produtos',
  imports: [
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    Toast,
    PaginatorModule,
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ProdutosComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getItems();
  }

  first: number = 0;
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  items: ProductModel[] = [];
  itemSelected: ProductModel | null = null;
  isLoading: boolean = false;

  toastResult(res: ApiResultModel<any>) {
    this.isLoading = false;
    if (res.success) {
      this.router.navigate(['/produto-tipos']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Alteração realizada!',
      });
    } else
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: `${res.errors.join('\n')}`,
      });
  }

  newItem() {
    this.router.navigate(['produto']);
  }

  editItem(id: number) {
    this.router.navigate(['produto', id]);
  }

  deleteItem() {
    if (!this.itemSelected) return;
    this.isLoading = true;
    this.productService.delete(this.itemSelected.id!).subscribe(
      (res) => {
        this.toastResult(res);
        if (res.success) this.getItems();
      },
      (error) => {
        this.toastResult(error.error);
      }
    );
  }

  deleteItemOnClick(item: ProductModel) {
    this.itemSelected = item;
    this.confirmPosition();
  }

  confirmPosition() {
    this.confirmationService.confirm({
      message: 'Tem certeza?',
      header: 'Confirmação',
      icon: 'pi pi-info-circle',
      rejectButtonStyleClass: 'p-button-text',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        text: true,
      },
      acceptButtonProps: {
        label: 'Confirmar',
        text: true,
      },
      accept: () => this.deleteItem(),

      reject: () => {},
      key: 'positionDialog',
    });
  }

  getItems() {
    this.isLoading = true;
    this.productService.getAll(this.page, this.limit).subscribe((res) => {
      this.isLoading = false;
      this.total = res.data.total;
      this.items = res.data.data;
    });
  }

  pageChange(e: any) {
    this.page = e.page + 1;
    this.getItems();
  }

  goToEstoque(id: number) {
    this.router.navigate([`/produto/${id}/estoque`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../api-services/ProductTypeService';
import { ProductTypeModel } from '../../models/ProductTypeModel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ApiResultModel } from '../../models/ApiResultModel';
import { Toast } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-produto-tipos',
  imports: [
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    Toast,
    PaginatorModule,
  ],
  templateUrl: './produto-tipos.component.html',
  styleUrl: './produto-tipos.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ProdutoTiposComponent implements OnInit {
  constructor(
    private productTypeService: ProductTypeService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getItems();
  }

  first: number = 0;
  page: number = 1;
  limit: number = 3;
  total: number = 0;
  items: ProductTypeModel[] = [];
  itemSelected: ProductTypeModel | null = null;
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
    this.router.navigate(['produto-tipo']);
  }

  editItem(id: number) {
    this.router.navigate(['produto-tipo', id]);
  }

  deleteItem() {
    if (!this.itemSelected) return;
    this.isLoading = true;
    this.productTypeService.delete(this.itemSelected.id!).subscribe(
      (res) => {
        this.toastResult(res);
        if (res.success) this.getItems();
      },
      (error) => {
        this.toastResult(error.error);
      }
    );
  }

  deleteItemOnClick(item: ProductTypeModel) {
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
    this.productTypeService
      .getAllPaginated(this.page, this.limit)
      .subscribe((res) => {
        this.isLoading = false;
        this.total = res.data.total;
        this.items = res.data.data;
      });
  }

  pageChange(e: any) {
    this.page = e.page + 1;
    this.getItems();
  }
}

import { ApiResultModel } from './../../models/ApiResultModel';
import { ProductTypeModel } from '../../models/ProductTypeModel';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/ProductModel';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ProductService } from '../../api-services/ProductService';
import { InventoryMovimentationService } from '../../api-services/InventoryMovimentationService';
import { InventoryMovimentationModel } from '../../models/InventoryMovimentationModel';
import { SelectModule } from 'primeng/select';

interface Action {
  description: string;
  inc: boolean;
}

@Component({
  selector: 'app-produto-estoque-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    Toast,
    ProgressBarModule,
    ConfirmDialog,
    SelectModule,
  ],
  templateUrl: './produto-estoque-form.component.html',
  styleUrl: './produto-estoque-form.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ProdutoEstoqueFormComponent implements OnInit {
  isLoading: boolean = false;
  saveIsLoading: boolean = false;
  formGroup: FormGroup;
  idParam: string | null = null;
  item: ProductModel | null = null;
  total: number = 0;
  actions: Action[] = [
    { description: 'Adicionar', inc: true },
    { description: 'Remover', inc: false },
  ];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private inventoryMovimentationService: InventoryMovimentationService
  ) {
    this.formGroup = this.fb.group({});
  }
  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('id');

    this.getItem();

    this.formGroup = this.fb.group({
      quantity: [null, [Validators.required]],
      inc: [this.actions[0], [Validators.required]],
    });
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
      accept: () => this.saveItem(),

      reject: () => {},
      key: 'positionDialog',
    });
  }

  getItem() {
    if (!this.idParam) return;
    this.isLoading = true;
    this.productService
      .getById(Number.parseFloat(this.idParam))
      .subscribe((res) => {
        this.isLoading = false;
        if (!res.success) return;
        this.item = res.data;

        this.getTotalMovimentation();
      });
  }

  getTotalMovimentation() {
    if (!this.idParam) return;
    this.isLoading = true;
    this.productService
      .getTotalMovimentation(Number.parseFloat(this.idParam))
      .subscribe((res) => {
        this.isLoading = false;
        this.total = res.data;
      });
  }

  toastResult(res: ApiResultModel<any>) {
    this.saveIsLoading = false;
    if (res.success) {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Salvo!',
      });

      this.getTotalMovimentation();
    } else
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: `${res.errors}`,
      });
  }
  onSubmit(): void {
    if (!this.formGroup.valid) return;

    this.confirmPosition();
  }

  saveItem() {
    let payload: InventoryMovimentationModel = {
      quantity: this.formGroup.value.quantity,
      inc: this.formGroup.value.inc.inc,
      productId: Number.parseFloat(this.idParam!),
    };
    this.saveIsLoading = true;

    this.inventoryMovimentationService.insert(payload)
    .subscribe(
      (res) => this.toastResult(res),
      (error) => {
        this.saveIsLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro!',
          detail: `${error.error.errors.join('/n')}`,
        });
      }
    );
  }
}

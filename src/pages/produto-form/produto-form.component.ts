import { InsertProductModel } from './../../models/InsertProductModel';
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
import { ProductService } from '../../api-services/ProductService';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { ProductTypeService } from '../../api-services/ProductTypeService';
import { ApiResultModel } from '../../models/ApiResultModel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-produto-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    Toast,
    InputNumberModule,
    SelectModule,
    ConfirmDialogModule,
    ProgressBarModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProdutoFormComponent implements OnInit {
  isLoading: boolean = false;
  saveIsLoading: boolean = false;
  productTypeSelectIsLoading = false;
  productTypes: ProductTypeModel[] = [];
  formGroup: FormGroup;
  idParam: string | null = null;
  item: ProductModel | null = null;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.fb.group({});
  }
  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('id');

    this.getItems();

    this.formGroup = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(150)]],
      productType: [null, [Validators.required]],
      price: [null],
      inventoryQuantity: [null],
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

        const productType = this.productTypes.find(
          (item) => item.id === res.data.productTypeId
        );

        this.formGroup.get('description')?.setValue(this.item.description);
        this.formGroup.get('price')?.setValue(this.item.price);
        this.formGroup.get('productType')?.setValue(productType);
      });
  }
  async getItems() {
    this.productTypeSelectIsLoading = true;
    this.productTypeService.getAll().subscribe((res) => {
      this.productTypeSelectIsLoading = false;
      if (res.success) {
        this.productTypes = res.data;
        this.getItem();
      }
    });
  }

  toastResult(res: ApiResultModel<any>) {
    this.saveIsLoading = false;
    if (res.success) {
      this.router.navigate(['/produtos']);
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso!',
        detail: 'Salvo!',
      });
    } else
      this.messageService.add({
        severity: 'error',
        summary: 'Erro!',
        detail: `${res.errors}`,
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
  onSubmit(): void {
    if (!this.formGroup.valid) return;

    this.confirmPosition();
  }

  saveItem() {
    let payload: ProductModel = {
      id: this.idParam ? this.item!.id : null,
      description: this.formGroup.value.description,
      price: this.formGroup.value.price,
      productTypeId: this.formGroup.value.productType.id,
    };
    this.saveIsLoading = true;

    if (this.idParam) {
      this.productService
        .update(payload.id!, payload)
        .subscribe((res) => this.toastResult(res));

      return;
    }

    let insertPayload: InsertProductModel = {
      id: this.idParam ? this.item!.id : null,
      description: this.formGroup.value.description,
      price: this.formGroup.value.price,
      productTypeId: this.formGroup.value.productType.id,
      inventoryQuantity: this.formGroup.value.inventoryQuantity,
    };

    this.productService
      .insert(insertPayload)
      .subscribe((res) => this.toastResult(res));
  }
}

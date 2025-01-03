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
import { ProductTypeService } from '../../api-services/ProductTypeService';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-produto-tipo-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    Toast,
    ProgressBarModule,
    ConfirmDialog,
  ],
  templateUrl: './produto-tipo-form.component.html',
  styleUrl: './produto-tipo-form.component.css',
  providers: [ConfirmationService, MessageService],
})
export class ProdutoTipoFormComponent implements OnInit {
  isLoading: boolean = false;
  saveIsLoading: boolean = false;
  formGroup: FormGroup;
  idParam: string | null = null;
  item: ProductTypeModel | null = null;
  constructor(
    private fb: FormBuilder,
    private productTypeService: ProductTypeService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService
  ) {
    this.formGroup = this.fb.group({});
  }
  ngOnInit(): void {
    this.idParam = this.route.snapshot.paramMap.get('id');

    this.getItem();

    this.formGroup = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(150)]],
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
    this.productTypeService
      .getById(Number.parseFloat(this.idParam))
      .subscribe((res) => {
        this.isLoading = false;
        if (!res.success) return;
        this.item = res.data;

        this.formGroup.get('description')?.setValue(this.item.description);
      });
  }

  toastResult(res: ApiResultModel<any>) {
    this.saveIsLoading = false;
    if (res.success) {
     
      this.router.navigate(['/produto-tipos']);
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
  onSubmit(): void {
    if (!this.formGroup.valid) return;

    this.confirmPosition();
  }

  saveItem() {
    let payload: ProductTypeModel = {
      id: this.idParam ? this.item!.id : null,
      description: this.formGroup.value.description,
    };
    this.saveIsLoading = true;

    if (this.idParam) {
      this.productTypeService
        .update(payload.id!, payload)
        .subscribe((res) => this.toastResult(res));

      return;
    }

    this.productTypeService
      .insert(payload)
      .subscribe((res) => this.toastResult(res));
  }
}

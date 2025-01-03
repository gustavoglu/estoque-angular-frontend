import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTipoFormComponent } from './produto-tipo-form.component';

describe('ProdutoTipoFormComponent', () => {
  let component: ProdutoTipoFormComponent;
  let fixture: ComponentFixture<ProdutoTipoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoTipoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoTipoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEstoqueFormComponent } from './produto-estoque-form.component';

describe('ProdutoEstoqueFormComponent', () => {
  let component: ProdutoEstoqueFormComponent;
  let fixture: ComponentFixture<ProdutoEstoqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoEstoqueFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoEstoqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

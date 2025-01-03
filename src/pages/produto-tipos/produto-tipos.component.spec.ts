import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoTiposComponent } from './produto-tipos.component';

describe('ProdutoTiposComponent', () => {
  let component: ProdutoTiposComponent;
  let fixture: ComponentFixture<ProdutoTiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoTiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoTiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
